import styles from "./style.module.scss"
import { useEffect, useState } from "react"
import api from "../../services/api"

function Index() {
  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [idade, setIdade] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [carregando, setCarregando] = useState(false)


  function adicionarUsuarioLocal() {
    if (!nome || !idade || !email) {
      setMensagem("Preencha todos os campos!")
      return
    }
    
    const novoUsuario = {
      id: Date.now(),
      nome: nome,
      idade: Number(idade),
      email: email
    }
    
    setUsuarios([novoUsuario, ...usuarios])
    setMensagem("Usuário adicionado localmente!")
    setNome("")
    setEmail("")
    setIdade("")
  }
 
  async function deletarUsuario(id) {
    setCarregando(true)
    try {
      await api.delete(`/api/usuarios/${id}/`)
      setMensagem("Usuário deletado permanentemente.")
      await tentarConectarAPI() 
    } catch (error) {
      setMensagem("Erro na API. Usuário deletado apenas localmente.")
     
      setUsuarios(usuarios.filter(usuario => usuario.id !== id))
    } finally {
      setCarregando(false)
    }
  }

 
  async function tentarConectarAPI() {
    try {
      const response = await api.get("/api/usuarios/")
      console.log('📊 Dados recebidos:', response.data)
      setUsuarios(response.data)
    } catch (error) {
      setMensagem("API Django não está rodando. Usando modo local.")
    }
  }

  
  async function enviarParaAPI() {
    if (!nome || !idade || !email) {
      setMensagem("Preencha todos os campos!")
      return
    }

    setCarregando(true)
    try {
      const response = await api.post("/api/usuarios/", {
        nome,
        email,
        idade: Number(idade)
      })
      
      setNome("")
      setEmail("")
      setIdade("")
      await tentarConectarAPI()
    } catch (error) {
      setMensagem("Erro na API. Adicionando localmente...")
      adicionarUsuarioLocal()
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    console.log('🔍 Iniciando conexão com API...')
    tentarConectarAPI()
  }, [])

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => { e.preventDefault(); enviarParaAPI(); }}>
        <h1>Cadastro de Usuários</h1>
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required
        />
        <input 
          type="number" 
          placeholder="Idade" 
          value={idade} 
          onChange={(e) => setIdade(e.target.value)} 
          min="0" 
          max="100" 
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <button type="submit" disabled={carregando} className={styles.cadastro}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {mensagem && (
        <div style={{ 
          padding: "10px", 
          margin: "10px 0", 
          backgroundColor: mensagem.includes("sucesso") || mensagem.includes("API") ? "#d4edda" : "#f8d7da",
          color: mensagem.includes("sucesso") || mensagem.includes("API") ? "#155724" : "#721c24",
          borderRadius: "4px"
        }}>
          {mensagem}
        </div>
      )}

      <h3>Usuários ({usuarios.length})</h3>
      {usuarios.map((item) => (
        <div key={item.id} className={styles.card}>
          <div>
            <p>Nome: {item.nome}</p>
            <p>Idade: {item.idade} anos</p>
            <p>Email: {item.email}</p>
          </div>
          <button 
            className={styles.lixeira}
            onClick={() => deletarUsuario(item.id)}
            title="Deletar usuário"
            disabled={carregando}
          >
            <span className="material-symbols-outlined">
              {carregando ? "hourglass_empty" : "delete"}
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Index

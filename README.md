# 📝 Sistema de Cadastro de Usuários

Um sistema completo de cadastro de usuários desenvolvido com **React** (frontend) e **Django REST Framework** (backend), conectado ao **MySQL**.

## 🚀 Funcionalidades

- ✅ **Cadastro de usuários** com validação de dados
- ✅ **Listagem de usuários** em tempo real
- ✅ **Exclusão de usuários** com confirmação
- ✅ **Validação de formulário** (nome, email, idade)
- ✅ **Modo offline** - funciona mesmo sem o backend
- ✅ **Interface responsiva** e moderna
- ✅ **API REST** completa
- ✅ **CORS configurado** para comunicação frontend/backend

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca para interface de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **Sass/SCSS** - Pré-processador CSS
- **Axios** - Cliente HTTP para requisições

### Backend
- **Django 5.2.5** - Framework web Python
- **Django REST Framework** - API REST
- **MySQL** - Banco de dados
- **django-cors-headers** - Configuração CORS

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Python** (versão 3.8 ou superior)
- **MySQL** (versão 8.0 ou superior)
- **Git**

## 🚀 Como Executar o Projeto

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd front-cadastro
```

### 2. Configuração do Backend (Django)

```bash
# Navegue para a pasta do backend
cd backend

# Crie um ambiente virtual (recomendado)
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r ../requirements.txt

# Configure o banco de dados MySQL
# Crie um banco chamado 'richard' no MySQL

# Execute as migrações
python manage.py makemigrations
python manage.py migrate

# Inicie o servidor Django
python manage.py runserver
```

O backend estará rodando em: `http://localhost:8000`

### 3. Configuração do Frontend (React)

```bash
# Navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## 🗄️ Estrutura do Banco de Dados

### Tabela: Usuario
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | AutoField | Chave primária |
| nome | CharField(100) | Nome do usuário |
| email | EmailField | Email único |
| idade | PositiveIntegerField | Idade (0-100) |

## 🔧 Configuração do Banco de Dados

No arquivo `backend/backend/settings.py`, configure suas credenciais do MySQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'richard',    # Nome do banco
        'USER': 'root',       # Seu usuário MySQL
        'PASSWORD': 'richa123', # Sua senha MySQL
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

## 📡 API Endpoints

### Usuários
- `GET /api/usuarios/` - Lista todos os usuários
- `POST /api/usuarios/` - Cria um novo usuário
- `DELETE /api/usuarios/{id}/` - Deleta um usuário

### Exemplo de uso da API:

```javascript
// Criar usuário
fetch('http://localhost:8000/api/usuarios/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao@email.com',
    idade: 25
  })
})

// Listar usuários
fetch('http://localhost:8000/api/usuarios/')
  .then(response => response.json())
  .then(data => console.log(data))
```

## 🎨 Interface do Usuário

- **Formulário de cadastro** com validação em tempo real
- **Lista de usuários** com cards informativos
- **Botões de ação** para exclusão
- **Mensagens de feedback** para o usuário
- **Design responsivo** para diferentes tamanhos de tela

## 🔄 Modo Offline

O sistema possui um modo offline inteligente:
- Se o backend não estiver disponível, os dados são salvos localmente
- Quando o backend voltar, os dados são sincronizados automaticamente
- Mensagens informativas indicam o status da conexão

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Faça upload da pasta 'dist' para seu provedor
```

### Backend (Heroku/Railway)
```bash
cd backend
# Configure as variáveis de ambiente
# Faça deploy do código
```

## 📁 Estrutura do Projeto

```
front-cadastro/
├── backend/                 # Django API
│   ├── backend/
│   │   ├── settings.py     # Configurações
│   │   └── urls.py         # URLs principais
│   └── dados_usuarios/     # App de usuários
│       ├── models.py       # Modelos do banco
│       ├── views.py        # Views da API
│       └── serializers.py  # Serializers
├── frontend/               # React App
│   ├── src/
│   │   ├── Pages/Home/     # Página principal
│   │   └── services/       # Serviços da API
│   └── package.json
└── requirements.txt        # Dependências Python
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por Richard Moreaes Souza

---

## 🌍 Contato

- 💼 [LinkedIn](https://www.linkedin.com/in/richard-moraes-souza-998539338/)
- 🌐 [Portfólio](https://richardmoraessouza.github.io/Portf-lio/)
- 📱 [WhatsApp](https://wa.me/5547999326217?text=Olá%20Richard%2C%20encontrei%20seu%20perfil%20no%20GitHub!)
- 📧 Email: richardmoraessouza2006@gmail

**Nota**: Certifique-se de que o MySQL está rodando e o banco de dados 'react' existe antes de executar o backend.

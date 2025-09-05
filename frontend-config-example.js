// Configuração para conectar o frontend React com a API Django
// Cole este código no seu projeto frontend

// ========================================
// CONFIGURAÇÃO DA API
// ========================================

// URLs da API
const API_URLS = {
  development: 'http://localhost:8000',
  production: 'https://api-cadastro-7.onrender.com'
};

// Detecta se está em produção
const isProduction = process.env.NODE_ENV === 'production' || 
                    window.location.hostname.includes('github.io');

// URL da API baseada no ambiente
export const API_BASE_URL = isProduction ? API_URLS.production : API_URLS.development;

// ========================================
// SERVIÇOS DA API
// ========================================

// Classe para gerenciar as requisições
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // Listar todos os usuários
  async getUsuarios() {
    return this.request('/api/usuarios/');
  }

  // Criar novo usuário
  async createUsuario(usuario) {
    return this.request('/api/usuarios/', {
      method: 'POST',
      body: JSON.stringify(usuario)
    });
  }

  // Deletar usuário
  async deleteUsuario(id) {
    return this.request(`/api/usuarios/${id}/`, {
      method: 'DELETE'
    });
  }

  // Atualizar usuário
  async updateUsuario(id, usuario) {
    return this.request(`/api/usuarios/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(usuario)
    });
  }
}

// Instância do serviço
export const apiService = new ApiService();

// ========================================
// EXEMPLO DE USO NO REACT
// ========================================

// Hook personalizado para gerenciar usuários
import { useState, useEffect } from 'react';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar usuários
  const loadUsuarios = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Criar usuário
  const createUsuario = async (usuarioData) => {
    try {
      const novoUsuario = await apiService.createUsuario(usuarioData);
      setUsuarios(prev => [...prev, novoUsuario]);
      return novoUsuario;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Deletar usuário
  const deleteUsuario = async (id) => {
    try {
      await apiService.deleteUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Carregar usuários quando o componente monta
  useEffect(() => {
    loadUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    loadUsuarios,
    createUsuario,
    deleteUsuario
  };
};

// ========================================
// EXEMPLO DE COMPONENTE REACT
// ========================================

import React, { useState } from 'react';
import { useUsuarios } from './apiService';

const UsuarioForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    idade: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ nome: '', email: '', idade: '' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="idade"
        placeholder="Idade"
        value={formData.idade}
        onChange={handleChange}
        min="0"
        max="100"
        required
      />
      <button type="submit">Criar Usuário</button>
    </form>
  );
};

const UsuarioList = ({ usuarios, onDelete }) => {
  return (
    <div>
      <h3>Usuários Cadastrados</h3>
      {usuarios.map(usuario => (
        <div key={usuario.id} className="usuario-card">
          <h4>{usuario.nome}</h4>
          <p>Email: {usuario.email}</p>
          <p>Idade: {usuario.idade} anos</p>
          <button onClick={() => onDelete(usuario.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const { usuarios, loading, error, createUsuario, deleteUsuario } = useUsuarios();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Sistema de Cadastro</h1>
      <UsuarioForm onSubmit={createUsuario} />
      <UsuarioList usuarios={usuarios} onDelete={deleteUsuario} />
    </div>
  );
};

export default App;

// ========================================
// CONFIGURAÇÃO DO VITE (vite.config.js)
// ========================================

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
*/

// ========================================
// VARIÁVEIS DE AMBIENTE (.env)
// ========================================

/*
# Desenvolvimento
VITE_API_URL=http://localhost:8000

# Produção (GitHub Pages)
VITE_API_URL=https://api-cadastro-7.onrender.com
*/

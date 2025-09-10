import axios from 'axios';

// URLs da API baseadas no ambiente
const API_URLS = {
  development: 'http://localhost:8000',
  production: 'https://api-cadastro-7.onrender.com'
};

// Detecta se está em produção
const isProduction = import.meta.env.PROD || 
                    window.location.hostname.includes('github.io');

// Força o uso da API de produção para teste
const API_BASE_URL = API_URLS.production;

// Configuração do axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

// Interceptor para debug
api.interceptors.request.use(
    (config) => {
        console.log(`🚀 Fazendo requisição para: ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Erro na requisição:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`✅ Resposta recebida:`, response.data);
        return response;
    },
    (error) => {
        console.error('❌ Erro na resposta:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
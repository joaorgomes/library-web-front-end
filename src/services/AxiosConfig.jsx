import axios from "axios";

// Configura o axios para incluir o token no cabeçalho das requisições
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
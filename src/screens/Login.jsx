import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormGroup from '../components/FormGroup';
import axios from "axios"; // Importe o axios para fazer requisições HTTP
import {jwtDecode} from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use a função de login do contexto
  const [username, setUsername] = useState(""); // Alterado de "email" para "username"
  const [password, setPassword] = useState(""); // Alterado de "senha" para "password"
  const [error, setError] = useState(""); // Estado para mensagens de erro

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/v1/auth", {
        username: username,
        password: password,
      });
  
      if (response.data.token) {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
  
        const userData = {
          username: decodedToken.sub, // Ajuste conforme a estrutura do JWT
          role: decodedToken.role, // Certifique-se de que o backend envia a role no token
          token: token,
        };
  
        login(userData); // Salva no AuthContext
        navigate("/dashboard"); // Redireciona para o dashboard
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      console.error(err);
    }
  };

  const handleRegister = () => {
    navigate("/newuser", { state: { hideNavbar: true } });
  };

  return (
    <>
      <h2>Login</h2>
      <div className="row">
        <FormGroup
          label="Username:"
          id="idusername"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu username"
        />
        <FormGroup
          label="Password:"
          id="idpassword"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        {error && <div className="alert alert-danger">{error}</div>} {/* Exibe mensagens de erro */}
        <div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Entrar
          </button>
          <button className="btn btn-secondary" onClick={handleRegister}>
            Cadastrar
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;

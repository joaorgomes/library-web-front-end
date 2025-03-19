import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await axios.post("http://localhost:8080/v1/auth", credentials);
    const { token } = response.data;

    localStorage.setItem("token", token);

    // Decodificando o token para obter as roles
    const decoded = jwtDecode(token);

    // Definindo o usuário e suas roles
    setUser(decoded.sub);
    
    setUserRoles(decoded.roles);  // Salvando as roles no estado
    console.log(decoded.roles)
    localStorage.setItem("roles", JSON.stringify(decoded.roles)); // Armazenando no localStorage

    console.log(decoded);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    setToken(null);
    setUser(null);
    setUserRoles(null); // Limpando as roles no logout
    axios.defaults.headers.common["Authorization"] = "";
    console.log("logout");
  };

  return (
    <AuthContext.Provider value={{ user, userRoles, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

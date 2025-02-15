import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    alert('E-mail: ' + email + '\nSenha: ' + senha);
  };

  const handleRegister = () => {
    alert("Redirecionando para a tela de cadastro...");
  };

  return (
    <>
    <h2>Login</h2>
    <div className="row">
      <FormGroup 
        label='Email:' 
        id='idemail' 
        name="email"
        type='email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu e-mail">
      </FormGroup>
      <FormGroup
        label='Password:' 
        id='idpass' 
        name="password"
        type='password' 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha">
      </FormGroup>
      <div>
        <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>Entrar</button>
        <button className="btn btn-secondary" onClick={() => navigate("/newuser", {state:{hideNavbar:true}})}>Cadastrar</button>
      </div>
    </div>
    </>
  );
}
export default Login;
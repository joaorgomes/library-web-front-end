// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FormGroup from "../components/FormGroup";
// import { useAuth } from "../context/AuthContext";



// function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");

//   const handleLogin = () => {
//     alert('E-mail: ' + email + '\nSenha: ' + senha);
//   };

//   const handleRegister = () => {
//     alert("Redirecionando para a tela de cadastro...");
//   };
//   return (
//     <>
//     <h2>Login</h2>
//     <div className="row">
//       <FormGroup 
//         label='Email:' 
//         id='idemail' 
//         name="email"
//         type='email' 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Digite seu e-mail">
//       </FormGroup>
//       <FormGroup
//         label='Password:' 
//         id='idpass' 
//         name="password"
//         type='password' 
//         value={senha} 
//         onChange={(e) => setSenha(e.target.value)}
//         placeholder="Digite sua senha">
//       </FormGroup>
//       <div>
//         <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>Entrar</button>
//         <button className="btn btn-secondary" onClick={() => navigate("/newuser", {state:{hideNavbar:true}})}>Cadastrar</button>
//       </div>
//     </div>
//     </>
//   );
// }
// export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FormGroup from "../components/FormGroup";
// import { useAuth } from "../context/AuthContext";

// function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     try {
//       const success = await login(email, senha);
//       if (success) {
//         navigate("/dashboard");
//       } else {
//         setError("Credenciais inválidas. Tente novamente.");
//       }
//     } catch (err) {
//       setError("Erro ao tentar fazer login.");
//     }
//   };

//   const handleRegister = () => {
//     navigate("/newuser", { state: { hideNavbar: true } });
//   };

//   return (
//     <>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div className="row">
//         <FormGroup
//           label="Email:"
//           id="idemail"
//           name="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Digite seu e-mail"
//         />
//         <FormGroup
//           label="Password:"
//           id="idpass"
//           name="password"
//           type="password"
//           value={senha}
//           onChange={(e) => setSenha(e.target.value)}
//           placeholder="Digite sua senha"
//         />
//         <div>
//           <button className="btn btn-primary" onClick={handleLogin}>
//             Entrar
//           </button>
//           <button className="btn btn-secondary" onClick={handleRegister}>
//             Cadastrar
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Alterado de email para username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (password.length !== 6) {
      setError("A senha deve ter exatamente 6 caracteres.");
      return;
    }

    try {
      const success = await login({ username, password });

      if (!success) {
        navigate("/dashboard");
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao tentar fazer login.");
    }
  };

  const handleRegister = () => {
    navigate("/newuser", { state: { hideNavbar: true } });
  };

  return (
    <>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="row">
        <FormGroup
          label="Email:"
          id="idusername"
          name="username"  // Certo, mas o backend espera um email aqui
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <FormGroup
          label="Senha:"
          id="idpassword"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha (6 caracteres)"
        />
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

import React from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { useAuth } from "../context/AuthContext"; // Importa o contexto de autenticação

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtém usuário e função de logout

  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Minha Aplicação</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <NavbarItem to="/dashboard" label="Home" />
            
            {/* Renderiza apenas se o usuário estiver logado */}
            {user && user.role === 'ADMIN' && (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="cadastroDropdown"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Cadastro
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="cadastroDropdown">
                    <li><Link className="dropdown-item" to="/new-book">Livros</Link></li>
                    <li><Link className="dropdown-item" to="/new-authors">Autores</Link></li>
                    <li><Link className="dropdown-item" to="/new-publishers">Editoras</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="listarDropdown"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Listar
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="listarDropdown">
                    <li><Link className="dropdown-item" to="/book-list">Livros</Link></li>
                    <li><Link className="dropdown-item" to="/authors-list">Autores</Link></li>
                    <li><Link className="dropdown-item" to="/publishers-list">Editoras</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="contratoDropdown"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Contratos
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="contratoDropdown">
                    <li><Link className="dropdown-item" to="/contracts">Contratos</Link></li>
                    <li><Link className="dropdown-item" to="/contract-clauses">Cláusulas de Contrato</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="loanDropdown"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Empréstimos
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="loanDropdown">
                    <li><Link className="dropdown-item" to="/new-loan">Novo Empréstimo</Link></li>
                    <li><Link className="dropdown-item" to="/loan-list">Consultar Empréstimos</Link></li>
                  </ul>
                </li>

                <NavbarItem to="/surveys" label="Vistorias" />
              </>
            )}

            {/* Se o usuário estiver logado, mostra botão de logout */}
            {user ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout}>Sair</button>
              </li>
            ) : (
              <NavbarItem to="/login" label="Login" />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import NavbarItem from "./NavbarItem";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { logout, userRoles } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('logout--')
    logout();
    navigate("/");
  };
  const hasSurveyAccess = userRoles && userRoles.includes("ADMIN");
  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Minha Aplicação</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <NavbarItem href="/dashboard" label="Home" />
            {/* Verificando se o usuário tem o role necessário para acessar o item */}

            <li className="nav-item dropdown" >
              <a className="nav-link dropdown-toggle" href="#" id="cadastroDropdown"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">Cadastro</a>
              <ul className="dropdown-menu" aria-labelledby="cadastroDropdown">
                <li><a className="dropdown-item" href="/new-book">Livros</a></li>
                <li><a className="dropdown-item" href="/new-authors">Autores</a></li>
                <li><a className="dropdown-item" href="/new-publishers">Editoras</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="listarDropdown"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">Listar</a>
              <ul className="dropdown-menu" aria-labelledby="listarDropdown">
                <li><a className="dropdown-item" href="/book-list">Livros</a></li>
                <li><a className="dropdown-item" href="/authors-list">Autores</a></li>
                <li><a className="dropdown-item" href="/publishers-list">Editoras</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="contratoDropdown"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">Contratos</a>
              <ul className="dropdown-menu" aria-labelledby="contratoDropdown">
                <li><a className="dropdown-item" href="/contracts">Contratos</a></li>
                <li><a className="dropdown-item" href="/contract-clauses">Claúsulas de Contrato</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="loanDropdown"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">Emprétimos</a>
              <ul className="dropdown-menu" aria-labelledby="loanDropdown">
                <li><a className="dropdown-item" href="/new-loan">Novo Emprestimo</a></li>
                <li><a className="dropdown-item" href="/loan-list">Consultar Empréstimos</a></li>
              </ul>
            </li>
    
            {hasSurveyAccess && (
            <NavbarItem href="/surveys" label="Vistorias" />
          )}
            <NavbarItem href="/login" label="Sair" />

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
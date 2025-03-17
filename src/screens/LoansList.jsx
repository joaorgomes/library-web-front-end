import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Busca os dados dos empréstimos e usuários ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loansRes, usersRes] = await Promise.all([
          axios.get("http://localhost:8080/v1/loans"),
          axios.get("http://localhost:8080/v1/user"),
        ]);
        setLoans(loansRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  // Função para atualizar o status dos empréstimos vencidos
  const handleMarkOverdue = async () => {
    try {
      await axios.post("http://localhost:8080/v1/loans/mark-overdue");
      alert("Status dos empréstimos vencidos atualizados com sucesso!");
      // Atualiza a lista de empréstimos após a atualização
      const response = await axios.get("http://localhost:8080/v1/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Erro ao atualizar status dos empréstimos:", error);
      alert("Erro ao atualizar status dos empréstimos. Tente novamente.");
    }
  };

  // Função para calcular os dias restantes
  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  // Função para devolver o livro
  const handleReturn = async (loanId) => {
    try {
      await axios.put(`http://localhost:8080/v1/loans/${loanId}/return`);
      alert("Livro devolvido com sucesso!");
      // Atualiza a lista de empréstimos após a devolução
      const response = await axios.get("http://localhost:8080/v1/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Erro ao devolver o livro:", error);
      alert("Erro ao devolver o livro. Tente novamente.");
    }
  };

  // Função para finalizar o empréstimo
  const handleFinalize = async (loanId) => {
    try {
      await axios.put(`http://localhost:8080/v1/loans/${loanId}/finalize`);
      alert("Empréstimo finalizado com sucesso!");
      // Atualiza a lista de empréstimos após a finalização
      const response = await axios.get("http://localhost:8080/v1/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Erro ao finalizar o empréstimo:", error);
      alert("Erro ao finalizar o empréstimo. Tente novamente.");
    }
  };

  // Função para renovar o empréstimo
  const handleRenew = async (loanId) => {
    try {
      await axios.put(`http://localhost:8080/v1/loans/${loanId}/renew`);
      alert("Empréstimo renovado com sucesso!");
      // Atualiza a lista de empréstimos após a renovação
      const response = await axios.get("http://localhost:8080/v1/loans");
      setLoans(response.data);
    } catch (error) {
      //console.error("Erro ao renovar o empréstimo:", error);
      const errorMessage = error.response?.data?.message || "Erro ao renovar o empréstimo. Tente novamente.";
      alert(errorMessage);
    }
  };

  // Função para buscar o nome do usuário pelo ID
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Usuário não encontrado";
  };

  // Função para filtrar os empréstimos
  const filteredLoans = loans.filter((loan) => {
    const userName = getUserName(loan.userId).toLowerCase();
    return (
      userName.includes(searchTerm.toLowerCase()) ||
      loan.loanStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.exemplaryId.toString().includes(searchTerm)
    );
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Listagem de Empréstimos</h1>

      {/* Botão Novo Empréstimo */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/new-loan")}
      >
        Novo Empréstimo
      </button>
      {/* Botão para atualizar vencidos */}
      <button
        className="btn btn-info mb-3 ms-3"
        onClick={handleMarkOverdue}
      >
        Atualizar  Vencidos
      </button>

      

      {/* Campo de Busca */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nome do usuário, status ou ID do exemplar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabela de Empréstimos */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data Inicial</th>
            <th>Data de Devolução</th>
            <th>Status</th>
            <th>Exemplar ID</th>
            <th>Usuário</th>
            <th>Dias Restantes</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{new Date(loan.loanInitialDate).toLocaleDateString()}</td>
              <td>{new Date(loan.loanEndDate).toLocaleDateString()}</td>
              <td>{loan.loanStatus}</td>
              <td>{loan.exemplaryId}</td>
              <td>{getUserName(loan.userId)}</td>
              <td>{calculateDaysRemaining(loan.loanEndDate)} dias</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleRenew(loan.id)}
                >
                  Renovar
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleReturn(loan.id)}
                >
                  Devolver
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleFinalize(loan.id)}
                >
                  Finalizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanManagement;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NewLoan = () => {
  const [loan, setLoan] = useState({
    loanInitialDate: "",
    loanEndDate: "",
    loanStatus: "REALIZADO",
    exemplaryId: null,
    userId: null,
    bookId: null,
  });

  const [books, setBooks] = useState([]); // Inicializando como array vazio
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Para armazenar o livro selecionado
  const navigate = useNavigate();

  // Busca os livros e usuários ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, userRes] = await Promise.all([
          axios.get("http://localhost:8080/v1/book"),
          axios.get("http://localhost:8080/v1/user"),
        ]);

        console.log("Resposta da API:", bookRes.data); // Verifique a estrutura aqui

        setBooks(Array.isArray(bookRes.data) ? bookRes.data : []);
        setUsers(Array.isArray(userRes.data) ? userRes.data : []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Atualiza o estado do empréstimo quando os campos do formulário mudam
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedLoan = { ...loan, [name]: value };

    // Calcula a data de devolução automaticamente (10 dias após a data inicial)
    if (name === "loanInitialDate") {
      const initialDate = new Date(value);
      initialDate.setDate(initialDate.getDate() + 10);
      updatedLoan.loanEndDate = initialDate.toISOString().split("T")[0];
    }

    setLoan(updatedLoan);
  };

  // Atualiza o estado ao selecionar um livro e seus exemplares
  const handleBookSelection = (e) => {
    const bookId = e.target.value;
    const selectedBook = books.find((book) => book.id === parseInt(bookId));
    setLoan({ ...loan, bookId, exemplaryId: null });
    setSelectedBook(selectedBook); // Armazena o livro selecionado

    if (selectedBook && selectedBook.numberCopies) {
      // Filtra os exemplares disponíveis, assumindo que empréstimos são indicados por uma condição de loan
      const availableExemplaries = selectedBook.numberCopies.filter(
        (exemplary) => exemplary.loan === null // Verifica se não há empréstimo associado
      );

      if (availableExemplaries.length > 0) {
        setLoan((prevLoan) => ({ ...prevLoan, exemplaryId: availableExemplaries[0].id }));
      }
    }
  };

  // Envia o formulário para cadastrar o empréstimo
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const exemplaryId = selectedBook.numberCopies && selectedBook.numberCopies.length > 0
        ? selectedBook.numberCopies[0].id  // Aqui, use o id real do exemplar
        : null;  // Ou algum valor padrão se não houver exemplares

      const newLoan = {
        loanInitialDate: new Date(loan.loanInitialDate).toISOString(), // já inclui hora no formato LocalDateTime
        loanEndDate: new Date(loan.loanEndDate).toISOString(), // agora inclui hora
        loanStatus: loan.loanStatus,
        exemplaryId: exemplaryId,
        userId: Number(loan.userId),
      };

      const response = await axios.post("http://localhost:8080/v1/loans", newLoan);
      console.log("Empréstimo cadastrado com sucesso:", response.data);
      navigate("/loan-list");
    } catch (error) {
      console.error("Erro ao cadastrar empréstimo:", error);
      alert("Erro ao cadastrar empréstimo. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Cadastrar Empréstimo</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo: Data Inicial do Empréstimo */}
        <div className="mb-3">
          <label className="form-label">Data Inicial do Empréstimo:</label>
          <input
            type="date"
            className="form-control"
            name="loanInitialDate"
            value={loan.loanInitialDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Data de Devolução (somente leitura) */}
        <div className="mb-3">
          <label className="form-label">Data de Devolução:</label>
          <input
            type="date"
            className="form-control"
            name="loanEndDate"
            value={loan.loanEndDate}
            readOnly
          />
        </div>

        {/* Campo: Selecionar Livro */}
        <div className="mb-3">
          <label className="form-label">Livro:</label>
          <select
            className="form-select"
            name="bookId"
            value={loan.bookId || ""}
            onChange={handleBookSelection}
            required
          >
            <option value="">Selecione um livro</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        {/* Exemplar associado automaticamente */}
        <div className="mb-3">
          <label className="form-label">Exemplar Associado:</label>
          <input
            type="text"
            className="form-control"
            value={
              loan.exemplaryId
                ? `Exemplar ID: ${loan.exemplaryId}`
                : selectedBook
                  ? selectedBook.numberCopies && selectedBook.numberCopies.length > 0
                    ? selectedBook.numberCopies
                      .filter(copy => copy.isActive === true || copy.isActive === null) // Filtra exemplares ativos
                      .map(copy => `Exemplar ID: ${copy.id}`)[0] || "Nenhum exemplar disponível" // Exibe o primeiro exemplar ativo
                    : "Nenhum exemplar disponível"
                  : "Nenhum livro selecionado"
            }
            readOnly
          />
        </div>

        {/* Campo: Selecionar Usuário */}
        <div className="mb-3">
          <label className="form-label">Usuário:</label>
          <select
            className="form-select"
            name="userId"
            value={loan.userId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botão: Salvar Empréstimo */}
        <button type="submit" className="btn btn-primary">
          Salvar Empréstimo
        </button>
      </form>
    </div>
  );
};

export default NewLoan;



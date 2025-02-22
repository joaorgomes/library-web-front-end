import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function NewBook() {
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    yearPublication: "",
    numberPages: "",
    publisherName: "",
    authors: [],
    copies: "",
    gender: "",
  });

  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [publishersRes, authorsRes] = await Promise.all([
          axios.get("http://localhost:8080/v1/publisher"),
          axios.get("http://localhost:8080/v1/author")
        ]);
        setPublishers(publishersRes.data);
        setAuthors(authorsRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();

    if (location.state?.book) {
      setBook({
        ...location.state.book,
        copies: location.state.book.numberCopies ? location.state.book.numberCopies.length : 0
      });
    } else if (id) {
      axios.get(`http://localhost:8080/v1/book/${id}`)
        .then(response => {
          const bookData = response.data;
          setBook({
            ...bookData,
            copies: bookData.numberCopies ? bookData.numberCopies.length : 0
          });
        })
        .catch(error => console.error("Erro ao carregar livro:", error));
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/v1/book/${id}`, requestData);
      } else {
        await axios.post("http://localhost:8080/v1/book", requestData);
      }
      navigate("/book-list");
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{book.id ? "Editar Livro" : "Cadastrar Livro"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input type="text" className="form-control" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN:</label>
          <input type="text" className="form-control" name="isbn" value={book.isbn} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Ano de Publicação:</label>
          <input type="number" className="form-control" name="yearPublication" value={book.yearPublication} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Páginas:</label>
          <input type="number" className="form-control" name="numberPages" value={book.numberPages} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Editor:</label>
          <select className="form-select" name="publisher" value={book.publisher} onChange={handleChange} required>
            {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Autores:</label>
          <select
            className="form-select"
            name="authors"
            value={book.authors}
            onChange={(e) => {
              const selectedAuthors = Array.from(e.target.selectedOptions, option => option.value);
              setBook({ ...book, authors: selectedAuthors });
            }}
            multiple // Permite múltiplas seleções
            required
          >
            {authors.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Exemplares:</label>
          <input type="number" className="form-control" name="copies" value={book.copies} onChange={handleChange} min="1" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Gênero:</label>
          <select className="form-select" name="gender" value={book.gender} onChange={handleChange}>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Biography">Biography</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Historical">Historical</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {book.id ? "Atualizar Livro" : "Cadastrar Livro"}
        </button>
      </form>
    </div>
  );
};

export default NewBook;

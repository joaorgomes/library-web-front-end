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
    publisherId: 0,
    authorIds: [],
    numberCopies: 1,
    gender: "",
    chapters: {} 
  });

  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [chapterTitles, setChapterTitles] = useState([]);
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
      setBook({ ...location.state.book, numberCopies: location.state.book.numberCopies.length });
      setChapterTitles(Object.keys(location.state.book.chapters || {}));
    } else if (id) {
      axios.get(`http://localhost:8080/v1/book/${id}`)
        .then(response => {
          setBook({ ...response.data, numberCopies: response.data.numberCopies.length });
          setChapterTitles(Object.keys(response.data.chapters || {}));
        })
        .catch(error => console.error("Erro ao carregar livro:", error));
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAuthorChange = (e) => {
    const selectedAuthors = Array.from(e.target.selectedOptions, option => Number(option.value));
    setBook({ ...book, authorIds: selectedAuthors });
  };

  const handleChapterChange = (index, e) => {
    const updatedTitles = [...chapterTitles];
    updatedTitles[index] = e.target.value;
    setChapterTitles(updatedTitles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedChapters = {};
      chapterTitles.forEach((title, index) => {
        formattedChapters[title] = index + 1;
      });
      const newBook = { ...book, chapters: formattedChapters, numberCopies: Number(book.numberCopies) };

      if (id) {
        await axios.put(`http://localhost:8080/v1/book/${id}`, newBook);
      } else {
        await axios.post("http://localhost:8080/v1/book", newBook);
      }
      navigate("/book-list");
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{id ? "Editar Livro" : "Cadastrar Livro"}</h1>
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
          <select className="form-select" name="publisherId" value={book.publisherId} onChange={handleChange} required>
            {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Autores:</label>
          <select className="form-select" multiple name="authorIds" value={book.authorIds} onChange={handleAuthorChange} required>
            {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Exemplares:</label>
          <input type="number" className="form-control" name="numberCopies" value={book.numberCopies} onChange={handleChange} min="1" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Gênero:</label>
          <input type="text" className="form-control" name="gender" value={book.gender} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Capítulos:</label>
          <button type="button" className="btn btn-secondary" onClick={() => setChapterTitles([...chapterTitles, ""])}>Adicionar Capítulo</button>
        </div>
        {chapterTitles.map((title, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => handleChapterChange(index, e)}
              placeholder={`Título do Capítulo ${index + 1}`}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">{id ? "Atualizar Livro" : "Salvar Livro"}</button>
      </form>
    </div>
  );
}

export default NewBook;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    yearPublication: "",
    numberPages: "",
    publisherId: null, // Aqui você já define como null inicialmente
    numberCopies: "",
    chapters: {},
    authorNames: [],
    gender: "",
  });

  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [chapterTitles, setChapterTitles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Função para buscar as editoras e autores ao carregar a página
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

    // Carregar os dados do livro ao abrir a página de edição
    if (id) {
      axios.get(`http://localhost:8080/v1/book/${id}`)
        .then(response => {
          setBook({
            ...response.data,
            publisherId: response.data.publisherId || 1, // Garantir que publisherId esteja setado
            numberCopies: response.data.numberCopies.length
          });
          setChapterTitles(Object.keys(response.data.chapters || {}));
        })
        .catch(error => console.error("Erro ao carregar livro:", error));
    }
  }, [id]);

  // Formatação dos capítulos para enviar ao backend
  const formattedChapters = chapterTitles.reduce((acc, title) => {
    acc[title] = 1; // Cada capítulo recebe o valor 1
    return acc;
  }, {});

  // Função para tratar o submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Montar o objeto com os dados que serão enviados
    const updatedBook = {
      ...book,
      chapters: formattedChapters,
      numberCopies: Number(book.numberCopies), // Garantir que numberCopies seja um número
      publisherId: book.publisherId, // Aqui você garante que está enviando o publisherId correto
    };

    try {
      // Atualizar o livro no backend
      await axios.put(`http://localhost:8080/v1/book/${id}`, updatedBook);
      navigate("/books");
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      // Aqui você pode adicionar algum tipo de feedback para o usuário
    }
  };

  return (
    <div>
      <h1>Editar Livro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            value={book.isbn}
            readOnly // ISBN não pode ser alterado
          />
        </div>
        <div>
          <label>Ano de publicação:</label>
          <input
            type="number"
            value={book.yearPublication}
            onChange={(e) => setBook({ ...book, yearPublication: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Número de páginas:</label>
          <input
            type="number"
            value={book.numberPages}
            onChange={(e) => setBook({ ...book, numberPages: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Editora:</label>
          <select
            value={book.publisherId}
            onChange={(e) => setBook({ ...book, publisherId: e.target.value })}
            required
          >
            <option value="">Selecione uma editora</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantidade de cópias:</label>
          <input
            type="number"
            value={book.numberCopies}
            onChange={(e) => setBook({ ...book, numberCopies: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Autores:</label>
          <select
            multiple
            value={book.authorNames.map((author) => author.id)}
            onChange={(e) => {
              const selectedAuthors = Array.from(e.target.selectedOptions, (option) => ({
                id: option.value,
                name: option.textContent,
              }));
              setBook({ ...book, authorNames: selectedAuthors });
            }}
            required
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Gênero:</label>
          <input
            type="text"
            value={book.gender}
            onChange={(e) => setBook({ ...book, gender: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Capítulos:</label>
          <input
            type="text"
            value={chapterTitles.join(", ")}
            onChange={(e) => setChapterTitles(e.target.value.split(", ").map((title) => title.trim()))}
            placeholder="Exemplo: Introdução, Capítulo 1"
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default UpdateBook;

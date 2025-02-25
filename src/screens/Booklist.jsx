import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function BookList() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]); // Estado para armazenar os livros
    const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
    const [loading, setLoading] = useState(true); // Estado de carregamento

    async function fetchBooks() {
        try {
            const response = await axios.get("http://localhost:8080/v1/book");
            setBooks(response.data); // Atualiza o estado com os dados recebidos
            setLoading(false); // Desativa o carregamento
            console.log("Livros recebidos:", response.data);
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
            setLoading(false); // Também desativa o carregamento em caso de erro
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []); // Chama a função quando o componente for montado

    // Função para atualizar o termo de busca
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrando os livros com base no termo de busca
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Carregando...</div>; // Exibe um carregamento enquanto busca os dados
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Livros</h1>

            <form className="mb-4">

                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Buscar por título"
                    />
                </div>
            </form>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Título</th>
                        <th>ISBN</th>
                        <th>Ano de Publicação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {filteredBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.isbn}</td>
                            <td>{book.yearPublication}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => navigate("/new-book", { state: { book } })}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm ms-2"
                                    onClick={() => {
                                        if (window.confirm("Tem certeza que deseja excluir?")) {
                                            console.log("Tentando excluir o livro com ID:", book.id); // Debug
                                            if (book.id) {
                                                axios.delete(`http://localhost:8080/v1/book/${book.id}`)
                                                    .then(() => {
                                                        console.log("Livro excluído com sucesso:", book.id);
                                                        fetchBooks(); // Atualiza a lista
                                                    })
                                                    .catch(error => console.error("Erro ao excluir livro:", error));
                                            } else {
                                                console.error("Erro: ID do livro é null ou indefinido.");
                                            }
                                        }
                                    }}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;

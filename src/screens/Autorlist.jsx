import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/v1/author")
            .then(response => setAuthors(response.data))
            .catch(error => console.error("Erro ao buscar autores:", error));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este autor?")) {
            try {
                await axios.delete(`http://localhost:8080/v1/author/${id}`);
                setAuthors(authors.filter(author => author.id !== id));
            } catch (error) {
                console.error("Erro ao excluir autor:", error);
            }
        }
    };

    const handleListBooks = async (author) => {
        if (!author || !author.name) {
            console.error("Erro: Autor inválido ou sem nome definido.");
            return;
        }

        setSelectedAuthor(author);
        try {
            const response = await axios.get(`http://localhost:8080/v1/book/authors`, {
                params: { authors: author.name } // Enviando como query param
            });
            setBooks(response.data);
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao buscar livros do autor:", error);
        }
    };

    const handleEdit = (author) => {
        // Passa o objeto completo 'author' via 'state' para a página de edição
        navigate(`/new-authors`, { state: { author } });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Autores</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map(author => (
                        <tr key={author.id}>
                            <td>{author.id}</td>
                            <td>{author.name}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(author)}>Editar</button>
                                <button className="btn btn-danger me-2" onClick={() => handleDelete(author.id)}>Deletar</button>
                                <button className="btn btn-info" onClick={() => handleListBooks(author)}>Listar Livros</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Livros de {selectedAuthor?.name}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                {books.length > 0 ? (
                                    books.map(book => (
                                        <div key={book.id} className="mb-4 border rounded p-3 shadow-sm">
                                            <div className="d-flex">
                                                <div style={{ width: "120px", height: "180px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
                                                    <span style={{ color: "#888" }}>Capa não disponível</span>
                                                </div>
                                                <div>
                                                    <h6><strong>Título:</strong> {book.title}</h6>
                                                    <p><strong>ISBN:</strong> {book.isbn || "Não informado"}</p>
                                                    <p><strong>Ano de Publicação:</strong> {book.yearPublication || "Não informado"}</p>
                                                    <p><strong>Editora:</strong> {book.publisherName || "Não informado"}</p>
                                                    <p><strong>Número de Páginas:</strong> {book.numberPages || "Não informado"}</p>
                                                    {/* <p><strong>Quantidade de Cópias:</strong> {book.numberCopies || "Não informado"}</p> */}
                                                    {/* <p><strong>Autores:</strong> {book.authorNames?.join(", ") || "Não informado"}</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Nenhum livro encontrado para este autor.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}

export default AuthorList;

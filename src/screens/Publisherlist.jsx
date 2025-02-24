import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function PublisherList() {
    const navigate = useNavigate();
    const [publishers, setPublishers] = useState([]); // Estado para armazenar as editoras
    const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
    const [loading, setLoading] = useState(true); // Estado de carregamento

    async function fetchPublishers() {
        try {
            const response = await axios.get("http://localhost:8080/v1/publisher");
            setPublishers(response.data); // Atualiza o estado com os dados recebidos
            setLoading(false); // Desativa o carregamento
            console.log("Editoras recebidas:", response.data);
        } catch (error) {
            console.error("Erro ao buscar editoras:", error);
            setLoading(false); // Também desativa o carregamento em caso de erro
        }
    }

    useEffect(() => {
        fetchPublishers();
    }, []); // Chama a função quando o componente for montado

    // Função para atualizar o termo de busca
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrando as editoras com base no termo de busca
    const filteredPublishers = publishers.filter((publisher) =>
        publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Carregando...</div>; // Exibe um carregamento enquanto busca os dados
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Editoras</h1>

            <form className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Buscar por nome"
                    />
                </div>
            </form>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPublishers.map((publisher) => (
                        <tr key={publisher.id}>
                            <td>{publisher.name}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => navigate("/new-publisher", { state: { publisher } })}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm ms-2"
                                    onClick={() => {
                                        if (window.confirm("Tem certeza que deseja excluir?")) {
                                            console.log("Tentando excluir a editora com ID:", publisher.id); // Debug
                                            if (publisher.id) {
                                                axios.delete(`http://localhost:8080/v1/publisher/${publisher.id}`)
                                                    .then(() => {
                                                        console.log("Editora excluída com sucesso:", publisher.id);
                                                        fetchPublishers(); // Atualiza a lista
                                                    })
                                                    .catch(error => console.error("Erro ao excluir editora:", error));
                                            } else {
                                                console.error("Erro: ID da editora é null ou indefinido.");
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

export default PublisherList;

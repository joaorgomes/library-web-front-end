import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function NewPublisher() {
  const navigate = useNavigate();
  const { state } = useLocation();  // Pega os dados da editora se estiverem presentes
  const [publisher, setPublisher] = useState({ name: "" });

  useEffect(() => {
    // Se a editora for passada via state, preenche o formulário com seus dados
    if (state?.publisher) {
      setPublisher(state.publisher);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublisher((prevPublisher) => ({ ...prevPublisher, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Se a editora tem um ID, significa que estamos editando, então usamos PUT
      if (publisher.id) {
        await axios.put(`http://localhost:8080/v1/publisher/${publisher.id}`, publisher);
        alert("Editora editada com sucesso!");
      } else {
        await axios.post("http://localhost:8080/v1/publisher", publisher);
        alert("Editora cadastrada com sucesso!");
      }
      navigate("/publishers-list");  // Após o cadastro ou edição, redireciona para a lista de editoras
    } catch (error) {
      console.error("Erro ao cadastrar ou editar editora:", error);
      alert("Erro ao processar a operação. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-800">
      <div className="row justify-content-center">
        <h3 className="text-center mb-4">{publisher.id ? "Editar Editora" : "Cadastro de Editora"}</h3>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white w-50">
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={publisher.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" type="submit">
              {publisher.id ? "Salvar alterações" : "Cadastrar"}
            </button>
            <button className="btn btn-danger" type="button" onClick={() => navigate("/publishers-list")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPublisher;

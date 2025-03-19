import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function NewAuthor() {
  const navigate = useNavigate();
  const { state } = useLocation();  // Pega os dados do autor se estiverem presentes
  const [author, setAuthor] = useState({ name: "" });

  useEffect(() => {
    // Se o autor for passado via state, preenche o formulário com seus dados
    if (state?.author) {
      setAuthor(state.author);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prevAuthor) => ({ ...prevAuthor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Se o autor tem um ID, significa que estamos editando, então usamos PUT
      if (author.id) {
        await axios.put(`http://localhost:8080/v1/author/${author.id}`, author);
        alert("Autor editado com sucesso!");
      } else {
        await axios.post("http://localhost:8080/v1/author", author);
        alert("Autor cadastrado com sucesso!");
      }
      navigate("/authors-list");  // Após o cadastro ou edição, redireciona para a lista de autores
    } catch (error) {
      console.error("Erro ao cadastrar ou editar autor:", error);
      alert("Voce nao tem permiçoes para acessar essa funcionalidade.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-800">
      <div className="row justify-content-center">
        <h3 className="text-center mb-4">{author.id ? "Editar Autor" : "Cadastro de Autor"}</h3>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white w-50">
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={author.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" type="submit">
              {author.id ? "Salvar alterações" : "Cadastrar"}
            </button>
            <button className="btn btn-danger" type="button" onClick={() => navigate("/dashboard")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAuthor;

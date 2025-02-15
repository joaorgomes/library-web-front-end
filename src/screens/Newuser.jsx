import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import Navbar from "../components/Navbar";
import axios from "axios";


function NewUser() {
  const location = useLocation();
  const hideNavbar = location.state?.hideNavbar || false;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "ROLE_USER",
    adress: {
      city: "",
      street: "",
      state: "",
      zipCode: "",
      neighborhood: "",
      country: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("adress.")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        adress: {
          ...prevState.adress,
          [field]: value
        }
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando os seguintes dados:", formData);

    // Verificar se todos os campos de endereço estão preenchidos
    const { adress } = formData;
    if (!adress.city || !adress.street || !adress.state || !adress.zipCode || !adress.neighborhood || !adress.country) {
      alert("Por favor, preencha todos os campos de endereço.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/v1/user', formData);
      console.log("Resposta do servidor:", response.data);
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-800">

      <div className="row justify-content-center">
        {!hideNavbar && <Navbar />}
        <h3 className="text-center mb-4">Cadastro de Usuário</h3>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white w-50">
          <div className="row mb-3">
            <div className="col-mb-4">
              <FormGroup label="Nome:" id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>
          </div>
          <div className="col-mb-2">
            <FormGroup label="Email:" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-mb-2">
            <FormGroup label="Senha:" id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="row justify-content-center">
            <FormGroup label="Tipo:" id="type" name="type" type="select" value={formData.type} onChange={handleChange} options={[{ value: "ROLE_USER", label: "Usuário" }, { value: "ROLE_ADMIN", label: "Administrador" }]} />
          </div>
          

          <h5 className="mt-4">Endereço</h5>
          <div className="row mb-3">
            <div className="col-md-3">
              <FormGroup label="Rua:" id="street" name="adress.street" type="text" value={formData.adress.street} onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <FormGroup label="Bairro:" id="neighborhood" name="adress.neighborhood" type="text" value={formData.adress.neighborhood} onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <FormGroup label="Cidade:" id="city" name="adress.city" type="text" value={formData.adress.city} onChange={handleChange} required />
            </div>
            <div className="col-md-1">
              <FormGroup label="Estado:" id="state" name="adress.state" type="text" value={formData.adress.state} onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <FormGroup label="CEP:" id="zipCode" name="adress.zipCode" type="text" value={formData.adress.zipCode} onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <FormGroup label="País:" id="country" name="adress.country" type="text" value={formData.adress.country} onChange={handleChange} required />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" type="submit">Cadastrar</button>
            <button className="btn btn-danger" type="button" onClick={() => navigate("/login")}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
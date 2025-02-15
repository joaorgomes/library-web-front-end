
import {Outlet} from "react-router-dom"
import Navbar from "../components/Navbar";


const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Renderiza a página correspondente */}
    </div>
  );
};

export default MainLayout;
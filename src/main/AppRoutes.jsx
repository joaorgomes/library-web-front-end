import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../screens/Login";
import MainLayout from "./MainLayout";
import Dashboard from "../screens/Dashboard";
import NewUser from "../screens/Newuser";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Tela de login (sem Navbar) */}
                <Route path="/login" element={<Login />} />
                <Route path="/newuser" element={<NewUser />} />

                {/* Rotas da aplicação (com Navbar) */}
                <Route path="/" element={<MainLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
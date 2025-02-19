import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../screens/Login";
import MainLayout from "./MainLayout";
import Dashboard from "../screens/Dashboard";
import NewUser from "../screens/Newuser";
import BookList from "../screens/Booklist";
import NewBook from "../screens/Newbook";
import NewAuthor from "../screens/NewAuthor";
import AuthorList from "../screens/Autorlist";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Tela de login (sem Navbar) */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/newuser" element={<NewUser />} />

                {/* Rotas da aplicação (com Navbar) */}
                <Route path="/" element={<MainLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="book-list" element={<BookList />} />
                    <Route path="new-book" element={<NewBook />} />
                    <Route path="new-authors" element={<NewAuthor />} />
                    <Route path="authors-list" element={<AuthorList />} />
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
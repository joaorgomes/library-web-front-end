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
import NewPublisher from "../screens/Newpublisher";
import PublisherList from "../screens/Publisherlist";
import LoanManagement from "../screens/LoansList";
import NewLoan from "../screens/Newloan";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import AccessDenied from "../screens/AccessDenied";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Tela de login (sem Navbar) */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/newuser" element={<NewUser />} />

                {/* Rotas da aplicação (com Navbar) */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="book-list" element={<BookList />} />
                        <Route path="new-book" element={<NewBook />} />
                        <Route path="new-authors" element={<NewAuthor />} />
                        <Route path="authors-list" element={<AuthorList />} />
                        <Route path="new-publishers" element={<NewPublisher />} />
                        <Route path="publishers-list" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><PublisherList /></ProtectedRoute>} />
                        <Route path="new-loan" element={<NewLoan />} />
                        <Route path="loan-list" element={<ProtectedRoute roles={["ROLE_USER"]}><LoanManagement /></ProtectedRoute>} />
                        <Route path="accessdenied" element={<AccessDenied />} />
                    </Route>

                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
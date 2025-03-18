// import React from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Login from "../screens/Login";
// import MainLayout from "./MainLayout";
// import Dashboard from "../screens/Dashboard";
// import NewUser from "../screens/Newuser";
// import BookList from "../screens/Booklist";
// import NewBook from "../screens/Newbook";
// import NewAuthor from "../screens/NewAuthor";
// import AuthorList from "../screens/Autorlist";
// import NewPublisher from "../screens/Newpublisher";
// import PublisherList from "../screens/Publisherlist";
// import LoanManagement from "../screens/LoansList";
// import NewLoan from "../screens/Newloan";

// function AppRoutes() {
//     return (
//         <Router>
//             <Routes>
//                 {/* Tela de login (sem Navbar) */}
//                 <Route path="/" element={<Login />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/newuser" element={<NewUser />} />

//                 {/* Rotas da aplicação (com Navbar) */}
                
//                 <Route path="/" element={<MainLayout />}>
//                     <Route path="dashboard" element={<Dashboard />} />
//                     <Route path="book-list" element={<BookList />} />
//                     <Route path="new-book" element={<NewBook />} />
//                     <Route path="new-authors" element={<NewAuthor />} />
//                     <Route path="authors-list" element={<AuthorList />} />
//                     <Route path="new-publishers" element={<NewPublisher />} />
//                     <Route path="publishers-list" element={<PublisherList />} />
//                     <Route path="new-loan" element={<NewLoan />} />
//                     <Route path="loan-list" element={<LoanManagement />} />
//                 </Route>
//             </Routes>
//         </Router>
//     );
// }

// export default AppRoutes;

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import { useAuth } from "../context/AuthContext";
import MainLayout from "./MainLayout";
import Login from "../screens/Login";
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
import Unauthorized from "../screens/Unauthorized";

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/newuser" element={<NewUser />} />

            {/* Rotas Privadas - Necessitam Autenticação */}
            <Route element={<PrivateRoute requiredRoles={["USER", "ADMIN"]} />}>
                <Route path="/" element={<MainLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="book-list" element={<BookList />} />
                    <Route path="new-book" element={<NewBook />} />
                    <Route path="authors-list" element={<AuthorList />} />
                    <Route path="publishers-list" element={<PublisherList />} />
                    <Route path="new-loan" element={<NewLoan />} />
                    <Route path="loan-list" element={<LoanManagement />} />

                    {/* Somente ADMIN pode acessar */}
                    <Route element={<PrivateRoute requiredRoles={["ADMIN"]} />}>
                        <Route path="new-authors" element={<NewAuthor />} />
                        <Route path="new-publishers" element={<NewPublisher />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <Navbar user={user} onLogout={logout} />
            <Outlet /> {/* Renderiza a página correspondente */}
        </div>
    );
};

export default MainLayout;
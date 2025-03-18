import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ requiredRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role === "ADMIN") {
        return <Outlet />;
    }

    if (!requiredRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
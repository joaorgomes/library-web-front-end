import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
    const {userRoles} = useAuth();

    if (!userRoles) {
        return <Navigate to="/AccessDenied" />;
    }

    if (!roles.some((role) => userRoles.includes(role))) {
        return <h1>Acesso Negado</h1>;
    }

    return children;
};

export default ProtectedRoute;
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useContext(AuthContext).token;
    const location = useLocation()
    
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ location }} />
    }

    return children
}

export default PrivateRoute;
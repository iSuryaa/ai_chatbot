// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        // Not logged in → redirect to login
        return <Navigate to="/" replace />;
    }

    // Logged in → render the child component
    return children;
}

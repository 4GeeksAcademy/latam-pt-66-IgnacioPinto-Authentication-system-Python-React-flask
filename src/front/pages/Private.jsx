import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Validamos apenas cargue el componente
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Si no hay token, pa' fuera
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token"); // Destruimos el token
        navigate("/login"); // Redirigimos
    };

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-danger">Zona Privada 🛑</h1>
            <p className="lead">Si estás viendo esto, es porque tienes un token válido en tu sessionStorage.</p>
            <button className="btn btn-danger mt-4" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};
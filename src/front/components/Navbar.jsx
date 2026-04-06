import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	// Funcion para cerrar sesion desde cualquier parte
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	}

	return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container">

                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Mi App de Autenticación by Ignacio</span>
                </Link>

                <div className="ml-auto">
                    {/* Botones de navegación pública */}

                    <Link to="/login">
                        <button className="btn btn-outline-light me-2">Login</button>
                    </Link>

                    <Link to="/signup">
                        <button className="btn btn-outline-info me-2">Signup</button>
                    </Link>
                    
                    {/* Botones de navegación privada y Logout */}
                    <Link to="/private">
                        <button className="btn btn-primary me-2">Ir a Privado</button>
                    </Link>

                    <button onClick={handleLogout} className="btn btn-danger">
                        Logout
                    </button>
					
                </div>
            </div>
        </nav>
    );
};
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

    // Verificamos si existe el token para poder usarlo de forma condicional
    const token = sessionStorage.getItem("token");

	// Funcion para cerrar sesion desde cualquier parte
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	}

	return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="navbar-brand mb-0 h1">Mi App de Autenticación by Ignacio</span>
                </Link>

                <div className="ml-auto">
                    {/* RENDERIZADO CONDICIONAL */}
                    {!token ? (
                        /* Si NO hay token (usuario no autenticado), mostramos Login y Signup */
                        <>
                            <Link to="/login">
                                <button className="btn btn-outline-light me-2">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-outline-info me-2">Signup</button>
                            </Link>
                        </>
                    ) : (
                        /* Si SÍ hay token (usuario autenticado), mostramos Privado y Logout */
                        <>
                            <Link to="/private">
                                <button className="btn btn-primary me-2">Ir a Privado</button>
                            </Link>
                            <button onClick={handleLogout} className="btn btn-danger">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
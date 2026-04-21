import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    // Estado para guardar la información del usuario una vez validada
    const [userData, setUserData] = useState(null); 

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        // 1. Si ni siquiera hay token se saca al usuario
        if (!token) {
            console.log("No hay token, redirigiendo a login...");
            navigate("/login");
            return;
        }

        // 2. Si hay token, se lo enviamos al backend para ver si es real
        const verifyToken = async () => {
          try {
            const token = sessionStorage.getItem("token");
            // IMPORTANTE: agregar el endpoint correcto
            const response = await fetch(
              import.meta.env.VITE_BACKEND_URL + "/api/private",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );

            if (response.status === 401) {
              console.error("Token no válido o expirado");
              navigate("/login");
              return;
            }

            if (!response.ok) {
              // Esto atrapará errores 404, 500, etc.
              const errorData = await response.json();
              console.error("Error del servidor:", errorData);
              return;
            }

            const data = await response.json();
            setUserData(data);
          } catch (error) {
            // Aquí es donde cae el ERR_FAILED
            console.error(
              "No se pudo conectar con el servidor. Revisa si el puerto 3001 es público y si la URL tiene el /api",
            );
          }
        };

        verifyToken();

    }, [navigate]); // navigate como dependencia por buenas prácticas de React

    // Funcion q se usa y para hacer logout y salir de la zona privada
    const handleLogout = () => {
        sessionStorage.removeItem("token"); // Destruimos el token
        navigate("/login"); // Redirigimos
    };

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-danger">Zona Privada 🛑</h1>
            
            {/* Si ya recibimos los datos del backend, mostramos el contenido */}
            {userData ? (
                <>
                    <p className="lead text-success">
                        ¡Tu token es válido y ha sido verificado por el servidor!
                    </p>
                    {/* Si el backend devuelve el email, lo vamos a mostrar */}
                    {/* <h4>Bienvenido, {userData.email}</h4> */}
                    <h4>Bienvenido, {userData.email}</h4> 
                </>
            ) : (
                /* Mientras el fetch espera respuesta, mostramos un loading */
                <p>Verificando credenciales con el servidor de máxima seguridad...</p>
            )}

            <button className="btn btn-danger mt-4" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};
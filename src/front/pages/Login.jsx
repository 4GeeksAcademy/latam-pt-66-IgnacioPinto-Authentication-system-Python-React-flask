import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });
            if (resp.ok) {
                const data = await resp.json();
                sessionStorage.setItem("token", data.token); // se guarda el token
                navigate("/private");
            } else {
                alert("Credenciales invalidas");
            } 
        } catch (error) {
                console.error("Error:", error);
            }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <input className="form-control mb-3" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button className="btn btn-success w-100" type="submit">Login</button>
            </form>
            <Link to="/signup" className="d-block mt-3">Don't have an account? Sign up</Link>
        </div>
    );
}
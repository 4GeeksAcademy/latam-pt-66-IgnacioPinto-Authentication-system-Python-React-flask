import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });
            if (resp.ok) navigate("/login");
            else alert("Error al registrar");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <input className="form-control mb-3" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button className="btn btn-primary w-100" type="submit">Sign Up</button>
            </form>
            <Link to="/login" className="d-block mt-3">Already have an account? Login</Link>
        </div>
    );
}
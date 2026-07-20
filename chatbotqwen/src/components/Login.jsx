import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [password, setPassword] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        const res = await fetch(
            "http://localhost:7000/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    password
                })
            }
        );

        if (res.ok) {
            navigate("/chat", { state: { username: name } });
        } else {
            alert("Wrong credentials");
        }

    }
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Welcome Back</h1>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button type="submit">
                        Login
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );

}

export default Login;
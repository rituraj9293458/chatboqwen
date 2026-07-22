import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function HandleSubmit(e) {
        e.preventDefault();
         if (!username || !password) {
        alert("Username and password are required");
        return;
           } 
        const response = await fetch("http://localhost:7000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
      const data = await response.json();
      alert(data.message);
        if (response.ok) {
            navigate("/");
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>
                <form onSubmit={HandleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        value={username}
                        onChange={(e) => setuserName(e.target.value)}
                        placeholder="Username"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button type="submit">Signup</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
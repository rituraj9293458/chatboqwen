import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function HandleSubmit(e) {
        e.preventDefault();

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
        <form onSubmit={HandleSubmit}>
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
        </form>
    );
}

export default Signup;
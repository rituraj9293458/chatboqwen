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

            navigate("/chat");

        } else {

            alert("Wrong credentials");

        }

    }
    async function Handlesignup()
    {
        
    }
    return (

        <form onSubmit={handleLogin}>

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

            <button>

                Login

            </button>
            <button onClick={Handlesignup}>sign up</button>

        </form>

    );

}

export default Login;
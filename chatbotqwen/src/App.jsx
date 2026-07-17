import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import ChatPage from "./components/ChatPage";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/chat"
                element={<ChatPage />}
            />

        </Routes>

    );

}

export default App;
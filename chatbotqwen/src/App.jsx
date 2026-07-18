import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import Signup from "./components/Signup";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />
         <Route path="/signup" element={<Signup />} />
            <Route
                path="/chat"
                element={<ChatPage />}
            />

        </Routes>

    );

}

export default App;
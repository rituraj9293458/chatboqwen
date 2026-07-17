import ChatInput from "./components/chatinput";
import { useState } from "react";
import Headers from "./components/headersnlogo";
import Window from "./components/chatwindow";

function App() {
    const [message, setMessage] = useState("");
    const [msgHist, setMsgHist] = useState([]);

    return (
        <div>
            <Headers />
            <Window msgHist={msgHist} setMsgHist={setMsgHist} />
            <ChatInput
                message={message}
                setMessage={setMessage}
                msgHist={msgHist}
                setMsgHist={setMsgHist}
            />
        </div>
    );
}

export default App;

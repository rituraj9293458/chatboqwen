import ChatInput from "./chatinput";
import Headers from "./headersnlogo";
import Window from "./chatwindow";

import { useState } from "react";
import { useLocation } from "react-router-dom";

function ChatPage() {

    const location = useLocation();
    const username = location.state?.username || "";

    const [message,setMessage]=useState("");

    const [msgHist,setMsgHist]=useState([]);

    return (
        <div className="app-layout">
            <div className="chat-container">
                <Headers />
                <Window
                    msgHist={msgHist}
                    setMsgHist={setMsgHist}
                    username={username}
                />
                <ChatInput
                    message={message}
                    setMessage={setMessage}
                    msgHist={msgHist}
                    setMsgHist={setMsgHist}
                    username={username}
                />
            </div>
        </div>
    );

}

export default ChatPage;
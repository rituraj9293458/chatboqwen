import ChatInput from "./chatinput";
import Headers from "./headersnlogo";
import Window from "./chatwindow";

import { useState } from "react";

function ChatPage() {

    const [message,setMessage]=useState("");

    const [msgHist,setMsgHist]=useState([]);

    return(

        <div>

            <Headers/>

            <Window

                msgHist={msgHist}

                setMsgHist={setMsgHist}

            />

            <ChatInput

                message={message}

                setMessage={setMessage}

                msgHist={msgHist}

                setMsgHist={setMsgHist}

            />

        </div>

    );

}

export default ChatPage;
import { useEffect } from "react";

function Window(props) {
    useEffect(() => {
        async function loadMessages() {
            try {
                const token=localStorage.getItem("token");
                //const username = props.username;
                const res = await fetch("http://localhost:7000/chat",{
                   headers: {
                   Authorization: `Bearer ${token}`
                }
            }
        );
                if (!res.ok) {
             throw new Error("Unauthorized");
                    }
                const data = await res.json();
                props.setMsgHist(data || []);
            } catch (err) {
                console.log(err);
            }
        }

        loadMessages();
    }, []);

    return (
        <div className="chat-window">
            {props.msgHist.map((msg, index) => (
                <div key={msg._id ?? `${msg.role}-${index}`} className={`message-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`}>
                    <div className="message-content">
                        <div className="message-sender">{msg.role === 'user' ? props.username || 'You' : 'Qwen AI'}</div>
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Window;
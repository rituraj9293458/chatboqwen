import { useEffect } from "react";

function Window(props) {
    useEffect(() => {
        async function loadMessages() {
            try {
                const response = await fetch("http://localhost:7000/chat");
                const data = await response.json();
                props.setMsgHist(data);
            } catch (err) {
                console.log(err);
            }
        }

        loadMessages();
    }, []);

    return (
        <div>
            {props.msgHist.map((msg, index) => (
                <p key={msg._id ?? `${msg.role}-${index}`}>
                    <b>{msg.role} :</b> {msg.text}
                </p>
            ))}
        </div>
    );
}

export default Window;
function ChatInput(props) {

    function HandleChange(e) {

        props.setMessage(e.target.value);

    }

    async function HandleSubmit(e) {
        e.preventDefault();

        if (props.message.trim() === "")
            return;

        const userText = props.message;
        
        props.setMsgHist((prev) => [
            ...prev,
            { role: "user", text: userText, _id: Date.now() }
        ]);
        
        
        props.setMessage("");

        try {
            const username = props.username;
            const response = await fetch("http://localhost:7000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: userText,
                    role: "user",
                    username: username
                })
            });

            const data = await response.json();

           
            if (data.conversation) {
                props.setMsgHist(data.conversation);
            } else if (data.userMessage && data.aiMessage) {
                props.setMsgHist((prev) => [
                    ...prev.filter(m => m._id !== userText),
                    data.userMessage,
                    data.aiMessage
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="chat-input-area">
            <form onSubmit={HandleSubmit} className="input-form">
                <input
                    type="text"
                    value={props.message}
                    onChange={HandleChange}
                    placeholder="Message Qwen AI..."
                />
                <button type="submit">
                    <svg className="send-icon" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                    </svg>
                </button>
            </form>
        </div>
    );

}

export default ChatInput;
function ChatInput(props) {

    function HandleChange(e) {

        props.setMessage(e.target.value);

    }

    async function HandleSubmit(e) {
        e.preventDefault();

        if (props.message.trim() === "")
            return;

        const userText = props.message;
        
        // 1. Optimistically show the user's message immediately
        props.setMsgHist((prev) => [
            ...prev,
            { role: "user", text: userText, _id: Date.now() }
        ]);
        
        // 2. Clear the input immediately so the user doesn't feel stuck
        props.setMessage("");

        try {
            const response = await fetch("http://localhost:7000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: userText,
                    role: "user"
                })
            });

            const data = await response.json();

            // 3. Update the history with the final confirmed conversation from the server
            //    (This will replace the optimistic user message with the real one from DB,
            //     and also append the AI's response)
            if (data.conversation) {
                props.setMsgHist(data.conversation);
            } else if (data.userMessage && data.aiMessage) {
                props.setMsgHist((prev) => [
                    ...prev.filter(m => m._id !== userText), // fallback
                    data.userMessage,
                    data.aiMessage
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <form onSubmit={HandleSubmit}>

            <input
                type="text"
                value={props.message}
                onChange={HandleChange}
                placeholder="Enter message"
            />

            <button>

                Send

            </button>

        </form>

    );

}

export default ChatInput;
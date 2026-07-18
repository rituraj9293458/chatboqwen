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
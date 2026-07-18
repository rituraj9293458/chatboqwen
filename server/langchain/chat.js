const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const model = require("./model");
const chatPrompt = require("./prompt");

function convertToLangChainMessages(dbMessages) {
    return dbMessages.map((msg) => {
        if (msg.role === "user") {
            return new HumanMessage(msg.text);
        } else {
            return new AIMessage(msg.text);
        }
    });
}

async function getChatResponse(history, userInput) {
    const langchainHistory = convertToLangChainMessages(history);

    const formattedMessages = await chatPrompt.formatMessages({
        history: langchainHistory,
        input: userInput,
    });

    const response = await model.invoke(formattedMessages);

    return response.content;
}

module.exports = { getChatResponse };

// ============================================================
// langchain/chat.js — The main chat function
// ============================================================
// WHY THIS FILE EXISTS:
// This is the "brain" of the chatbot. It takes the conversation
// history from MongoDB, converts it into LangChain message
// objects, runs the prompt template + model, and returns the
// AI's response as plain text.
//
// KEY CONCEPT: MongoDB stores messages as { role, text }.
// But LangChain expects HumanMessage and AIMessage objects.
// This file bridges that gap.
//
// OLD WAY (buildPrompt):  "User: hello\nAI: hi"  ← one big string
// NEW WAY (LangChain):    [HumanMessage("hello"), AIMessage("hi")]  ← structured
// ============================================================

const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const model = require("./model");
const chatPrompt = require("./prompt");

// Convert MongoDB documents into LangChain message objects.
// This is how LangChain expects conversation history — as a list
// of typed message objects, NOT as a concatenated string.
function convertToLangChainMessages(dbMessages) {
    return dbMessages.map((msg) => {
        if (msg.role === "user") {
            return new HumanMessage(msg.text);
        } else {
            return new AIMessage(msg.text);
        }
    });
}

// Main function: takes conversation history + user's new message,
// formats the prompt, sends it to the LLM, returns the AI's text.
async function getChatResponse(history, userInput) {
    // Step 1: Convert DB messages → LangChain messages
    const langchainHistory = convertToLangChainMessages(history);

    // Step 2: Fill in the prompt template with history + current input
    const formattedMessages = await chatPrompt.formatMessages({
        history: langchainHistory,
        input: userInput,
    });

    // Step 3: Send the formatted messages to the LLM
    const response = await model.invoke(formattedMessages);

    // Step 4: Return just the text content from the AI's response
    return response.content;
}

module.exports = { getChatResponse };

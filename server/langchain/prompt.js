// ============================================================
// langchain/prompt.js — Creates the ChatPromptTemplate
// ============================================================
// WHY THIS FILE EXISTS:
// This replaces the old buildPrompt() function that manually
// concatenated strings like "User: hello\nAI: hi\n".
//
// WHAT IS ChatPromptTemplate?
// It's LangChain's way of defining a reusable prompt structure.
// Instead of string concatenation, we define "slots" that get
// filled in at runtime:
//   - A system message (tells the AI how to behave)
//   - A MessagesPlaceholder (where conversation history goes)
//   - A human message (the user's latest input)
//
// WHY IS THIS BETTER THAN buildPrompt()?
// 1. The LLM sees proper role tags (system/human/ai) — not one big string
// 2. Adding new sections (e.g., RAG context) = just add another placeholder
// 3. LangChain handles the formatting — we don't have to
// ============================================================

const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");

// Define the prompt template with three parts:
// 1. System message — sets the AI's personality and behavior
// 2. MessagesPlaceholder("history") — slot for past conversation messages
// 3. Human message with {input} — slot for the user's current message
const chatPrompt = ChatPromptTemplate.fromMessages([
    // NOTE: /no_think disables Qwen3's "thinking mode" which can cause empty responses.
    // Qwen3 wraps internal reasoning in <think> tags — LangChain strips these,
    // sometimes leaving no content. /no_think tells the model to respond directly.
    ["system", "you are a verstile agent your primary task is to focus on diffrent types of questions and give short and breif answers/no_think"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
]);

module.exports = chatPrompt;

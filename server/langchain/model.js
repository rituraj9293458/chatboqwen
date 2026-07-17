// ============================================================
// langchain/model.js — Creates the LLM (Large Language Model)
// ============================================================
// WHY THIS FILE EXISTS:
// This is the single place where we configure our connection to
// the Ollama LLM. If you ever want to change the model (e.g.,
// from "qwen3:4b" to "llama3"), you only change it here.
//
// WHAT IS ChatOllama?
// ChatOllama is LangChain's wrapper around Ollama. It lets us
// send structured messages (human, AI, system) to a local LLM
// and get back structured responses — instead of raw strings.
// ============================================================

const { ChatOllama } = require("@langchain/ollama");

// Create the LLM instance.
// - model: which Ollama model to use (must be pulled with `ollama pull qwen3:4b`)
// - temperature: 0.7 = balanced (creative but focused)
//   NOTE: Qwen3 has a "thinking mode" that can cause empty responses at temperature 0.
//   Using 0.7 avoids this issue while still giving consistent results.
const model = new ChatOllama({
    model: "qwen2.5:3b",
    temperature: 0.7,
});

module.exports = model;

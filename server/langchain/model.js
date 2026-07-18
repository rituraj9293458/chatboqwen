

const { ChatOllama } = require("@langchain/ollama");


const model = new ChatOllama({
    model: "qwen2.5:3b",
    temperature: 0.7,
});

module.exports = model;

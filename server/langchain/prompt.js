



const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");


const chatPrompt = ChatPromptTemplate.fromMessages([
    
    ["system", "you are a verstile agent your primary task is to focus on diffrent types of questions and give short and breif answers/no_think"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
]);

module.exports = chatPrompt;

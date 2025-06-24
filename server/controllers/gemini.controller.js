const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const logger = require('../lib/logger.lib');
const Code = require('../models/code.model');

const geminiController = {

    getRegularResponse: async (req, res) => {

        logger.post("/api/gemini/ask-regular");

        try {
            const { question, history } = req.body;
            const chat = await initializeExpertChat(history);
            const result = await chat.sendMessage(question);
            const response = result.response.text();


            return res.status(200).json({
                success: true,
                message: 'Response generated successfully',
                response
            });

        } catch (error) {
            logger.error("Regular response error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to generate response',
                error: error.message
            });
        }
    },

    // NOTE: this is not in use ,just made out there
    getFileResponse: async (req, res) => {

        logger.post("/api/gemini/ask-file");

        const { code, question } = req.body;


        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Code is required'
            });
        }

        if (!question) {
            return res.status(400).json({
                success: false,
                message: 'Question is required'
            });
        }


        try {
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Hello" }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Hello! I'm your expert programming assistant. How can I help you today?" }],
                    },
                    {
                        role: "user",
                        parts: [{
                            text: `I need you to act as a senior software architect with expertise in:
                            - Algorithm optimization and complexity analysis
                            - Design patterns and best practices
                            - Code refactoring and clean code principles
                            - Performance optimization
                            - Security best practices
                            - Testing and debugging strategies
                            Please analyze code and questions with this expertise.`
                        }],
                    },
                    {
                        role: "model",
                        parts: [{
                            text: `I understand my role as a senior software architect. I'll analyze your code with focus on:
                            1. Algorithmic efficiency and time/ space complexity
                            2. Code structure and design pattern implementation
                            3. Potential optimizations and performance improvements
                            4. Security vulnerabilities and best practices
                            5. Testing strategies and edge cases
                            6. Maintainability and readability improvements
                            Please share your code or questions.`
                        }],
                    },
                    {
                        role: "user",
                        parts: [{
                            text: `Please analyze this code with your expertise:\n\n${code}`
                        }]
                    },
                    {
                        role: "model",
                        parts: [{
                            text: `I've analyzed the code. I can provide insights on:
                            - Algorithmic complexity and efficiency
                            - Potential optimizations
                            - Design improvements
                            - Security considerations
                            - Testing approaches
                            What specific aspects would you like me to focus on ?`
                        }],
                    }
                ],
            });

            const result = await chat.sendMessage(question);
            const response = result.response.text();

            return res.status(200).json({
                success: true,
                message: 'Analysis completed successfully',
                response
            });

        } catch (error) {
            logger.error("File response error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to analyze code',
                error: error.message
            });
        }
    }
};


async function initializeExpertChat(history) {
    return model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }, {
                    text: "You're my coding buddy and programming mentor! " +
                        "I'd love your help with software development stuff - coding problems, architecture decisions, " +
                        "debugging, best practices, or just bouncing ideas around. " +
                        "Feel free to chat naturally and be friendly! If I ask about something completely off-topic, " +
                        "just gently steer me back to coding topics. " +
                        "Make your explanations clear and helpful, but don't be afraid to be conversational and supportive."
                }],
            },
            {
                role: "model",
                parts: [{ text: "Hey there! 👋 Great to meet you! I'm excited to be your coding buddy. Whether you're stuck on a tricky bug, want to brainstorm some architecture ideas, or just need someone to talk through a problem with - I'm here for it! What's on your mind today?" }],
            },
            {
                role: "user",
                parts: [{ text: "I'm looking for a friendly programming mentor who can help me grow as a developer." }],
            },
            {
                role: "model",
                parts: [{
                    text: `Awesome! I love helping fellow developers level up! 🚀 
                            
                            I'm here to help you with whatever you're working on:
                            • Debugging those head-scratching issues
                            • Code reviews and optimization tips  
                            • Architecture and design patterns
                            • Learning new technologies
                            • Career advice and best practices
                            
                            Think of me as that experienced dev friend who's always happy to pair program or chat about code over coffee. What are you working on lately, or what would you like to dive into?`
                }],
            },
            ...history
        ]
    });
}

module.exports = geminiController;
class MockAIService {

    async generateReply(message) {

        const text = message.toLowerCase();

        if (text.includes("hello") || text.includes("hi")) {

            return {
                reply: "Hello 👋 How can I help you today?",
                model: "mock-ai"
            };

        }

        if (text.includes("price")) {

            return {
                reply: "Please tell me which service price you want to know.",
                model: "mock-ai"
            };

        }

        if (text.includes("contact")) {

            return {
                reply: "You can contact us anytime through our website.",
                model: "mock-ai"
            };

        }

        return {

            reply:
                "Thank you for your message. Our AI assistant will help you shortly.",

            model:
                "mock-ai"

        };

    }

}

export default new MockAIService();
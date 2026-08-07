import messageRepository from "../repositories/message.repository.js";
import conversationRepository from "../repositories/conversation.repository.js";
import leadDetection from "./lead-detection.service.js";
import knowledgeSearchService from "./knowledge-search.service.js";
import openAIService from "./openai.service.js";

class MessageService {

    // ==========================================
    // Check Greeting
    // ==========================================

    isGreeting(message) {

        const text =
            message
                .trim()
                .toLowerCase()
                .replace(/[!?.,]+$/g, "");

        const greetings = [

            "hi",
            "hii",
            "hiii",
            "hiiii",

            "hello",
            "hey",
            "heyy",
            "heyyy",

            "good morning",
            "good afternoon",
            "good evening",
            "good night",

            "hi there",
            "hello there",
            "hey there"

        ];

        return greetings.includes(text);

    }


    // ==========================================
    // Greeting Response
    // ==========================================

    getGreetingResponse(message) {

        const text =
            message
                .trim()
                .toLowerCase();

        if (
            text.includes("good morning")
        ) {

            return "Good morning! How can I help you today?";

        }

        if (
            text.includes("good afternoon")
        ) {

            return "Good afternoon! How can I help you today?";

        }

        if (
            text.includes("good evening")
        ) {

            return "Good evening! How can I help you today?";

        }

        if (
            text.includes("good night")
        ) {

            return "Good night! If you have any questions, I'm happy to help.";

        }

        return "Hello! 👋 How can I help you today?";

    }


    // ==========================================
    // Send Message
    // ==========================================

    async send(chatbot, conversationId, message) {

        const conversation =
            await conversationRepository.findById(
                Number(conversationId)
            );

        if (!conversation) {

            throw new Error(
                "Conversation not found"
            );

        }


        // ==========================================
        // Save USER Message
        // ==========================================

        const userMessage =
            await messageRepository.create({

                conversationId:
                    Number(conversationId),

                role:
                    "USER",

                message

            });


        // ==========================================
        // Get Conversation History
        // ==========================================

        const history =
            await messageRepository.findByConversation(
                Number(conversationId)
            );


        // ==========================================
        // Lead Detection
        // ==========================================

        const lead =
            leadDetection.detect(message);

            


        // ==========================================
        // Greeting Detection
        // ==========================================

        if (this.isGreeting(message)) {

            const greetingMessage =
                this.getGreetingResponse(message);


            const assistantMessage =
                await messageRepository.create({

                    conversationId:
                        Number(conversationId),

                    role:
                        "ASSISTANT",

                    message:
                        greetingMessage,

                    model:
                        null,

                    inputTokens:
                        0,

                    outputTokens:
                        0

                });


            return {

                userMessage,

                assistantMessage,

                history,

                leadDetected:
                    lead.detected,

                keyword:
                    lead.keyword,

                usage:
                    null

            };

        }


        // ==========================================
        // Knowledge Search
        // ==========================================

        let knowledgeResults = [];


        try {

            knowledgeResults =
                await knowledgeSearchService.search(

                    chatbot.id,

                    message

                );


            console.log(
                "QUESTION:",
                message
            );


            console.log(
                "KNOWLEDGE RESULTS:",
                knowledgeResults
            );

        }

        catch (error) {

            console.error(
                "Knowledge Search Error:",
                error
            );

            knowledgeResults = [];

        }


        // ==========================================
        // No Knowledge Found
        // ==========================================

        if (!knowledgeResults.length) {

            const fallbackMessage =
                "I don't have information about that. I can only answer questions based on the information available in this company's knowledge base.";


            const assistantMessage =
                await messageRepository.create({

                    conversationId:
                        Number(conversationId),

                    role:
                        "ASSISTANT",

                    message:
                        fallbackMessage,

                    model:
                        chatbot.settings?.model ||
                        "gpt-5-mini",

                    inputTokens:
                        0,

                    outputTokens:
                        0

                });


            return {

                userMessage,

                assistantMessage,

                history,

                leadDetected:
                    lead.detected,

                keyword:
                    lead.keyword,

                usage:
                    null

            };

        }


        // ==========================================
        // Build Knowledge Context
        // ==========================================

        const knowledgeContext =

            knowledgeResults

                .map(

                    (item, index) =>

                        `SOURCE ${index + 1}

Document:
${item.document}

Content:
${item.content}`

                )

                .join("\n\n");


        // ==========================================
        // Prepare History For AI
        // ==========================================

        const aiHistory =

            history

                .slice(0, -1)

                .slice(-10)

                .map(item => ({

                    role:
                        item.role === "USER"
                            ? "user"
                            : "assistant",

                    content:
                        item.message

                }));


        // ==========================================
        // Generate AI Reply
        // ==========================================

        console.log(
            "KNOWLEDGE CONTEXT:",
            knowledgeContext
        );


        const aiResponse =

            await openAIService.generateReply({

                message,

                context:
                    knowledgeContext,

                history:
                    aiHistory,

                model:
                    chatbot.settings?.model ||
                    "gpt-5-mini",

                maxTokens:
                    chatbot.settings?.maxTokens ||
                    1000

            });


        console.log(
            "OPENAI RESPONSE:",
            aiResponse
        );


        // ==========================================
        // Save AI Message
        // ==========================================

        const assistantMessage =

            await messageRepository.create({

                conversationId:
                    Number(conversationId),

                role:
                    "ASSISTANT",

                message:
                    aiResponse.message,

                model:
                    chatbot.settings?.model ||
                    "gpt-5-mini",

                inputTokens:
                    aiResponse.usage?.prompt_tokens ||
                    0,

                outputTokens:
                    aiResponse.usage?.completion_tokens ||
                    0

            });


        // ==========================================
        // Return Response
        // ==========================================

        return {

            userMessage,

            assistantMessage,

            history,

            leadDetected:
                lead.detected,

            keyword:
                lead.keyword,

            usage:
                aiResponse.usage

        };

    }


    // ==========================================
    // Get Messages
    // ==========================================

    async getMessages(conversationId) {

        return await messageRepository.findByConversation(

            Number(conversationId)

        );

    }


    // ==========================================
    // Delete Message
    // ==========================================

    async delete(id) {

        return await messageRepository.delete(

            Number(id)

        );

    }

}


export default new MessageService();

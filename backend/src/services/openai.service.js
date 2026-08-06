import OpenAI from "openai";


class OpenAIService {

    constructor(){

        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

    }


    async generateReply({
        message,
        model = "gpt-5-mini",
        temperature = 0.7,
        maxTokens = 1000
    }) {


        const response =
            await this.client.chat.completions.create({

                model,

                messages:[
                    {
                        role:"user",
                        content:message
                    }
                ],

                temperature,

                max_tokens:maxTokens

            });


        return {

            message:
                response.choices[0].message.content,

            usage:
                response.usage

        };

    }

}


export default new OpenAIService();
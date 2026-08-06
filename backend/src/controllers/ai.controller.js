import aiService from "../services/ai.service.js";


class AIController {


    async test(req, res, next){

        try {

            const reply =
                await aiService.generateReply(
                    "Hello, introduce yourself"
                );


            res.json({

                success:true,

                data:reply

            });


        } catch(error){

            next(error);

        }

    }


}


export default new AIController();
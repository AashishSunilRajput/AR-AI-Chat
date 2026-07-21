import widgetRepository from "../repositories/widget.repository.js";

const widgetAuth = async (req, res, next) => {

    try {

        const { widgetKey } = req.params;

        const chatbot =
            await widgetRepository.findByWidgetKey(widgetKey);

        if (!chatbot) {

            return res.status(404).json({

                success: false,

                message: "Invalid widget key"

            });

        }

        if (!chatbot.isActive) {

            return res.status(403).json({

                success: false,

                message: "Chatbot is inactive"

            });

        }

        /**
         * Domain Validation
         */

        const allowedDomains =
            chatbot.allowedDomains;

        if (

            allowedDomains &&

            Array.isArray(allowedDomains) &&

            allowedDomains.length > 0

        ) {

            const origin =
                req.headers.origin;

            if (

                !origin ||

                !allowedDomains.includes(origin)

            ) {

                return res.status(403).json({

                    success: false,

                    message: "Domain not allowed"

                });

            }

        }

        req.chatbot = chatbot;

        next();

    }

    catch (error) {

        next(error);

    }

};

export default widgetAuth;
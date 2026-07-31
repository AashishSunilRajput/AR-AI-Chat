import LEAD_KEYWORDS from "../utils/lead-keywords.js";

class LeadDetectionService {

    detect(message) {

        if (!message) {

            return {

                detected: false,

                keyword: null

            };

        }

        const text =

            message.toLowerCase();

        const keyword =

            LEAD_KEYWORDS.find(

                item => text.includes(item)

            );

        return {

            detected: !!keyword,

            keyword

        };

    }

}

export default new LeadDetectionService();
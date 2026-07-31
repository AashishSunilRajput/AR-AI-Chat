import axios from "axios";


class WebsiteScraper {


    async fetch(url) {

        try {

            const response = await axios.get(
                url,
                {
                    headers: {
                        "User-Agent":
                        "Mozilla/5.0"
                    },

                    timeout: 10000
                }
            );


            return response.data;


        }
        catch(error) {

            throw new Error(
                "Unable to fetch website"
            );

        }

    }


}


export default new WebsiteScraper();
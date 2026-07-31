import * as cheerio from "cheerio";


class TitleExtractor {


    extract(html, url) {

        try {

            const $ = cheerio.load(html);


            const title =
                $("title")
                    .text()
                    .trim();


            if (title) {

                return title;

            }


            return new URL(url)
                .hostname
                .replace(
                    "www.",
                    ""
                );

        }
        catch(error) {

            return new URL(url)
                .hostname
                .replace(
                    "www.",
                    ""
                );

        }

    }


}


export default new TitleExtractor();
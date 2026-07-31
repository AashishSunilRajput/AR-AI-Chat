import * as cheerio from "cheerio";


class WebsiteCleaner {


    clean(html) {


        const $ = cheerio.load(html);


        // Remove unwanted tags

        $("script").remove();

        $("style").remove();

        $("noscript").remove();

        $("nav").remove();


        const text = $("body")
            .text();


        return text
            .replace(/\s+/g, " ")
            .trim();


    }


}


export default new WebsiteCleaner();
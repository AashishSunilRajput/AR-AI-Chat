import scraper from "./utils/website/scraper.js";
import cleaner from "./utils/website/cleaner.js";


console.log("Test Started");


try {

    const html = await scraper.fetch(
        "https://example.com"
    );


    console.log(
        "HTML Length:",
        html.length
    );


    const text = cleaner.clean(html);


    console.log(
        "TEXT:",
        text
    );


}
catch(error) {

    console.error(
        "ERROR:",
        error
    );

}
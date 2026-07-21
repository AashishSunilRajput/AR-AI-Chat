import fs from "fs";

class TxtExtractor {

    async extract(filePath) {

        return fs.readFileSync(

            filePath,

            "utf8"

        );

    }

}

export default new TxtExtractor();
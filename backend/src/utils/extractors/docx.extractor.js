import mammoth from "mammoth";

class DocxExtractor {

    async extract(filePath) {

        const result =
            await mammoth.extractRawText({

                path: filePath

            });

        return result.value;

    }

}

export default new DocxExtractor();
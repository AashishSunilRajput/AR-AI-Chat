import pdfExtractor from "./pdf.extractor.js";
import docxExtractor from "./docx.extractor.js";
import txtExtractor from "./txt.extractor.js";

class ExtractorFactory {

    getExtractor(mimeType) {

        switch (mimeType) {

            case "application/pdf":

                return pdfExtractor;

            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

                return docxExtractor;

            case "text/plain":

                return txtExtractor;

            default:

                throw new Error("Unsupported File Type");

        }

    }

}

export default new ExtractorFactory();
import fs from "fs";
import path from "path";

const uploadPath = "src/uploads/documents";

if (!fs.existsSync(uploadPath)) {

    fs.mkdirSync(uploadPath, {
        recursive: true
    });

}

class LocalStorage {

    getDestination() {

        return uploadPath;

    }

}

export default new LocalStorage();
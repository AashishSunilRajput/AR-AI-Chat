import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Persistent upload root
const uploadRoot =
    process.env.UPLOADS_ROOT ||
    path.resolve(__dirname, "../../../uploads");

const imagesPath = path.join(
    uploadRoot,
    "images"
);

const documentsPath = path.join(
    uploadRoot,
    "documents"
);

if (!fs.existsSync(documentsPath)) {
    fs.mkdirSync(documentsPath, {
        recursive: true
    });
}

if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, {
        recursive: true
    });
}

class LocalStorage {

    getDestination() {
        return documentsPath;
    }

    getImageDestination() {
        return imagesPath;
    }
}

export default new LocalStorage();
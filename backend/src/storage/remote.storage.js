import fs from "fs/promises";
import path from "path";

class RemoteStorage {

    async upload(filePath, folder) {

        const fileBuffer =
            await fs.readFile(filePath);

        const blob =
            new Blob([fileBuffer]);

        const formData =
            new FormData();

        formData.append(
            "folder",
            folder
        );

       formData.append(
    "file",
    blob,
    path.basename(filePath)
);

        const response =
            await fetch(
                process.env.STORAGE_UPLOAD_URL,
                {
                    method: "POST",

                    headers: {
                        "X-Storage-Key":
                            process.env.STORAGE_API_KEY
                    },

                    body: formData
                }
            );

        const responseText =
            await response.text();

        console.log(
            "STORAGE STATUS:",
            response.status
        );

        console.log(
            "STORAGE RESPONSE:",
            responseText
        );

        let result;

        try {
            result =
                JSON.parse(responseText);
        } catch {
            throw new Error(
                `Storage returned non-JSON response (${response.status})`
            );
        }

        if (!response.ok || !result.success) {
            throw new Error(
                result.message ||
                "Remote storage upload failed"
            );
        }

        return {
            filename: result.filename,
            folder: result.folder,
            url: result.url
        };
    }
}

export default new RemoteStorage();
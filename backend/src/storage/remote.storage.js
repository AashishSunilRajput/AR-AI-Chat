import fs from "fs/promises";

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
            filePath.split("/").pop()
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

        const result =
            await response.json();

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
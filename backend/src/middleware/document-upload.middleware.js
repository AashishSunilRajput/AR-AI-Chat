import multer from "multer";
import path from "path";

import localStorage from "../storage/local.storage.js";

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(
            null,
            localStorage.getDestination()
        );

    },

    filename(req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9);

        cb(

            null,

            uniqueName +
            path.extname(file.originalname)

        );

    }

});

const upload = multer({

    storage,

    limits: {

        fileSize: 20 * 1024 * 1024

    },

    fileFilter(req, file, cb) {

        const allowed = [

            "application/pdf",

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

            "text/plain"

        ];

        if (
            allowed.includes(file.mimetype)
        ) {

            cb(null, true);

        }

        else {

            cb(
                new Error("Invalid File Type")
            );

        }

    }

});

export default upload;
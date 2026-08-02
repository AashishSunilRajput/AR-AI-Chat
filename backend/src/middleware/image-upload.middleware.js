import multer from "multer";
import path from "path";

import localStorage from "../storage/local.storage.js";


const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(
            null,
            localStorage.getImageDestination()
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

        fileSize:
        5 * 1024 * 1024

    },


    fileFilter(req,file,cb){


        const allowed = [

            "image/jpeg",

            "image/png",

            "image/jpg",

            "image/webp"

        ];



        if(
            allowed.includes(
                file.mimetype
            )
        ){

            cb(
                null,
                true
            );

        }
        else{


            cb(

                new Error(
                    "Only image files allowed"
                )

            );


        }


    }


});


export default upload;
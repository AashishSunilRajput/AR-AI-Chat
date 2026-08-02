import fs from "fs";

const documentsPath =
    "src/uploads/documents";


const imagesPath =
    "src/uploads/images";



// Create Documents Folder

if (!fs.existsSync(documentsPath)) {

    fs.mkdirSync(
        documentsPath,
        {
            recursive:true
        }
    );

}



// Create Images Folder

if (!fs.existsSync(imagesPath)) {

    fs.mkdirSync(
        imagesPath,
        {
            recursive:true
        }
    );

}



class LocalStorage {


    // Knowledge Base Documents

    getDestination() {

        return documentsPath;

    }



    // Organization Logo
    // Chatbot Avatar

    getImageDestination() {

        return imagesPath;

    }


}


export default new LocalStorage();
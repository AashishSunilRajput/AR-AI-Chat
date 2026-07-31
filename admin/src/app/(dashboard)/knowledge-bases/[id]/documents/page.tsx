"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import knowledgeDocumentService, {
    KnowledgeDocument
} from "@/services/knowledge-document.service";

import knowledgeChunkService from "@/services/knowledge-chunk.service";
import embeddingService from "@/services/embedding.service";

import DocumentStats from "@/components/knowledge/DocumentStats";
import UploadCard from "@/components/knowledge/UploadCard";
import WebsiteImportCard from "@/components/knowledge/WebsiteImportCard";
import websiteImportService 
from "@/services/website-import.service";




export default function DocumentsPage() {
   
    const router = useRouter();

    const [importing, setImporting] = useState(false);

const [search, setSearch] = useState("");

    const params = useParams();

    const knowledgeBaseId =
        Number(params.id);


const [documents, setDocuments] =
    useState<KnowledgeDocument[]>([]);

const [loading, setLoading] =
    useState(true);

const [uploading, setUploading] =
    useState(false);



const [file, setFile] =
    useState<File | null>(null);


const loadDocuments = async () => {

    try {

        setLoading(true);

        const response =
            await knowledgeDocumentService.getDocuments(
                knowledgeBaseId
            );

        setDocuments(response.data);

    }
    catch (error) {

        console.error(error);

    }
    finally {

        setLoading(false);

    }

};

   useEffect(() => {

    if (knowledgeBaseId) {

        loadDocuments();

    }

}, [knowledgeBaseId]);



  const handleUpload = async () => {

    if (!file) {

        alert("Please select a file");

        return;

    }

    try {

        setUploading(true);

        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "knowledgeBaseId",
            String(knowledgeBaseId)
        );

        await knowledgeDocumentService.uploadDocument(
            formData
        );

        setFile(null);

        await loadDocuments();

        alert("Document uploaded successfully");

    }
    catch (error: any) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Upload failed"
        );

    }
    finally {

        setUploading(false);

    }

};




  const generateChunks = async (
    documentId: number
) => {

    try {

        await knowledgeChunkService.generateChunks(
            documentId
        );

        alert(
            "Chunks generated successfully."
        );

        loadDocuments();

    }
    catch (error) {

        console.error(error);

    }

};





 const generateEmbeddings = async (
    documentId: number
) => {

    try {

        await embeddingService.generateEmbeddings(
            documentId
        );

        alert(
            "Embeddings generated successfully."
        );

        loadDocuments();

    }
    catch (error) {

        console.error(error);

    }

};





    const deleteDocument = async (
    id: number
) => {

    if (!confirm(
        "Delete this document?"
    )) return;

    try {

        await knowledgeDocumentService.deleteDocument(
            id
        );

        loadDocuments();

    }
    catch (error) {

        console.error(error);

    }

};

 const importWebsite = async (
    url: string,
    type: "SINGLE" | "FULL"
) => {

    try {

        setImporting(true);


        await websiteImportService.importWebsite({

            knowledgeBaseId,

            url,

            type

        });


        alert(
            "Website imported successfully"
        );


        await loadDocuments();


    }
    catch(error) {

        console.error(error);

        alert(
            "Website import failed"
        );

    }
    finally {

        setImporting(false);

    }

};
const totalDocuments = documents.length;

const totalChunks = documents.reduce(

    (sum, doc) => sum + doc.chunkCount,

    0

);

const totalEmbeddings = documents.reduce(
    (sum, doc) => sum + (doc.embeddingCount || 0),
    0
);

const totalStorageBytes = documents.reduce(

    (sum, doc) => sum + (doc.fileSize || 0),

    0

);

function formatFileSize(bytes: number) {

    if (bytes < 1024)
        return `${bytes} B`;

    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;

    if (bytes < 1024 * 1024 * 1024)
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;

}
const totalStorage =
    formatFileSize(
        totalStorageBytes
    );


   if (loading) {

    return (

        <div className="flex items-center justify-center h-[60vh]">

            <div className="text-slate-500 text-lg">

                Loading documents...

            </div>

        </div>

    );

}




    return (

        <div className="space-y-6">


          {/* =======================================
    Header
======================================= */}

<div className="flex items-center justify-between">

    <div>

        <h1 className="text-3xl font-bold">

            Documents

        </h1>

        <p className="mt-2 text-slate-500">

            Upload and manage AI Knowledge documents

        </p>

    </div>

</div>
<DocumentStats

    totalDocuments={totalDocuments}

    totalChunks={totalChunks}

    totalEmbeddings={totalEmbeddings}

    totalStorage={totalStorage}

/>



            {/* Upload Card */}


<UploadCard

    file={file}

    uploading={uploading}

    onFileChange={setFile}

    onUpload={handleUpload}

/>

<WebsiteImportCard

    importing={importing}

    onImport={importWebsite}

/>


<div className="flex justify-between items-center">

    <input

        type="text"

        placeholder="Search documents..."

        value={search}

        onChange={(e) =>

            setSearch(e.target.value)

        }

        className="

            w-80

            rounded-xl

            border

            px-4

            py-3

            outline-none

            focus:border-blue-500

        "

    />

</div>

            {/* Documents Table */}


            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-sm
                "
            >


                <table className="w-full">


                    <thead className="bg-slate-50 border-b">

    <tr>

      <th className="p-4 text-left">Document</th>

<th className="p-4 text-left">Type</th>

<th className="p-4 text-left">Size</th>

<th className="p-4 text-center">Chunks</th>

<th className="p-4 text-center">Embeddings</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Uploaded</th>

<th className="p-4 text-center">Actions</th>

    </tr>

</thead>


                    <tbody>


                    {
                        documents.length === 0 && (

                            <tr>

                                <td
                                    colSpan={8}
                                    className="
                                        p-10
                                        text-center
                                        text-slate-500
                                    "
                                >

                                    No Documents Found

                                </td>

                            </tr>

                        )
                    }



                    {
                   documents
.filter(doc =>
    doc.title
        .toLowerCase()
        .includes(search.toLowerCase())
)
.map((doc) => (

<tr
    key={doc.id}
    className="border-b hover:bg-slate-50"
>

    {/* Document */}

    <td className="p-4">

        <div className="font-semibold">

            {doc.title}

        </div>

        <div className="text-xs text-slate-500">

            {doc.fileName}

        </div>

    </td>

    {/* File Type */}

    <td className="p-4">

        <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm">

            {doc.fileType}

        </span>

    </td>

    {/* Size */}

    <td className="p-4">

        {doc.fileSize || "-"}

    </td>

{/* Chunks */}

<td className="p-4 text-center">

    <span
        className="
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-sm
            font-medium
            text-blue-700
        "
    >

        {doc.chunkCount}

    </span>

</td>
{/* Embeddings */}

<td className="p-4 text-center">

    <span
        className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-sm
            font-medium
            text-green-700
        "
    >

        {doc.embeddingCount}

    </span>

</td>
    {/* Status */}

    <td className="p-4">

        <span
            className={`

                rounded-full
                px-3
                py-1
                text-sm

                ${
                    doc.processingStatus === "COMPLETED"

                    ? "bg-green-100 text-green-700"

                    : doc.processingStatus === "PROCESSING"

                    ? "bg-yellow-100 text-yellow-700"

                    : "bg-red-100 text-red-700"

                }

            `}
        >

            {doc.processingStatus}

        </span>

    </td>

    {/* Uploaded */}

    <td className="p-4 text-sm text-slate-500">

        {

            new Date(
                doc.createdAt
            ).toLocaleDateString()

        }

    </td>

    {/* Actions */}

    <td className="p-4">

        <div className="flex justify-center gap-2 flex-wrap">

         {
    doc.chunkCount === 0 && (

        <button

            onClick={() =>
                generateChunks(doc.id)
            }

            className="
                rounded-lg
                bg-blue-100
                px-3
                py-2
                text-sm
                text-blue-700
                hover:bg-blue-200
            "

        >

            Generate Chunks

        </button>

    )
}

{
    doc.chunkCount > 0 && (

        <button

            onClick={() =>
                router.push(
                    `/knowledge-bases/${knowledgeBaseId}/documents/${doc.id}/chunks`
                )
            }

            className="
                rounded-lg
                bg-purple-100
                px-3
                py-2
                text-sm
                text-purple-700
                hover:bg-purple-200
            "

        >

            View Chunks

        </button>

    )
}

{
    doc.chunkCount > 0 &&
    doc.embeddingCount === 0 && (

        <button

            onClick={() =>
                generateEmbeddings(doc.id)
            }

            className="
                rounded-lg
                bg-green-100
                px-3
                py-2
                text-sm
                text-green-700
                hover:bg-green-200
            "

        >

            Generate Embeddings

        </button>

    )
}

            {
    doc.embeddingCount > 0 && (

        <button

            onClick={() =>
                router.push(
                    `/knowledge-bases/${knowledgeBaseId}/documents/${doc.id}/embeddings`
                )
            }

            className="
                rounded-lg
                bg-emerald-100
                px-3
                py-2
                text-sm
                text-emerald-700
                hover:bg-emerald-200
            "

        >

            View Embeddings

        </button>

    )
}

            <button

                onClick={() =>
                    deleteDocument(
                        doc.id
                    )
                }

                className="
                    rounded-lg
                    bg-red-100
                    px-3
                    py-2
                    text-sm
                    text-red-700
                    hover:bg-red-200
                "

            >

                Delete

            </button>

        </div>

    </td>

</tr>

))


                        
                    }


                    </tbody>


                </table>


            </div>


        </div>

    );

}
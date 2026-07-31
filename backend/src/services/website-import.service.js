import path from "path";

import crawler from "../utils/website/crawler.js";
import cleaner from "../utils/website/cleaner.js";

import knowledgeBaseRepository from "../repositories/knowledge-base.repository.js";
import knowledgeDocumentRepository from "../repositories/knowledge-document.repository.js";

import knowledgeChunkService 
from "../services/knowledge-chunk.service.js";

import embeddingService 
from "../services/embedding.service.js";
import titleExtractor 
from "../utils/website/title-extractor.js";
import urlNormalizer
from "../utils/website/url-normalizer.js";
class WebsiteImportService {



    async importWebsite(
        user,
        knowledgeBaseId,
        url,
        type = "SINGLE"
    ) {


        // =====================================
        // Check Knowledge Base
        // =====================================


        let knowledgeBase;


        if (user.role === "SUPER_ADMIN") {


            knowledgeBase =
                await knowledgeBaseRepository.findById(
                    Number(knowledgeBaseId)
                );


        }
        else {


            knowledgeBase =
                await knowledgeBaseRepository.findById(
                    Number(knowledgeBaseId),
                    user.organizationId
                );


        }



        if (!knowledgeBase) {

            throw new Error(
                "Knowledge Base not found"
            );

        }



        // =====================================
        // Get Pages
        // =====================================


        let pages = [];



        if (type === "FULL") {


            pages =
                await crawler.crawl(
                    url,
                    20
                );


        }
        else {


            const html =
                await crawler.scraper?.fetch(
                    url
                );


            pages.push({

                url,

                html

            });


        }




        const documents = [];



        // =====================================
        // Create Documents
        // =====================================


     const uniquePages = [];


const visitedUrls = new Set();


for (const page of pages) {


    const normalizedUrl =
        urlNormalizer.normalize(
            page.url
        );


    if (
        visitedUrls.has(
            normalizedUrl
        )
    ) {

        continue;

    }


    visitedUrls.add(
        normalizedUrl
    );


    uniquePages.push({

        ...page,

        url: normalizedUrl

    });

}
let processedPages = 0;

for (const page of uniquePages) {

    const normalizedUrl =
        urlNormalizer.normalize(
            page.url
        );


    const existingDocument =
        await knowledgeDocumentRepository.findBySourceUrl(
            knowledgeBaseId,
            normalizedUrl
        );


    if (existingDocument) {

        console.log(
            "Skipping duplicate:",
            normalizedUrl
        );

        documents.push(
            existingDocument
        );

        continue;

    }


    const text =
        cleaner.clean(
            page.html
        );


    if (!text) {

        continue;

    }


    const document =
        await knowledgeDocumentRepository.create({

            knowledgeBaseId:
                Number(knowledgeBaseId),

            title:
                titleExtractor.extract(
                    page.html,
                    page.url
                ),

            fileName:
                this.getTitle(
                    page.url
                ) + ".html",

            fileType:
                "text/html",

            fileSize:
                text.length,

            storagePath:
                "WEBSITE_IMPORT",

            extractedText:
                text,

            sourceType:
                "WEBSITE",

            sourceUrl:
                normalizedUrl,

            processingStatus:
                "PENDING"

        });
await knowledgeDocumentRepository.startProcessing(
    document.id,
    1
);

    documents.push(document);

    await knowledgeChunkService.createChunks(
        document.id
    );

    await embeddingService.generate(
        document.id
    );

    processedPages++;

await knowledgeDocumentRepository.updateProgress(
    document.id,
    {
        processedPages: 1,
        totalPages: 1,
        currentUrl: normalizedUrl
    }
);

await knowledgeDocumentRepository.finishProcessing(
    document.id
);

}



        return {

            totalDocuments:
                documents.length,

            documents

        };


    }




    getTitle(url) {


        return new URL(url)
            .hostname
            .replace(
                "www.",
                ""
            );


    }



}


export default new WebsiteImportService();
import { URL } from "url";
import * as cheerio from "cheerio";

import scraper from "./scraper.js";

class WebsiteCrawler {

    // ==========================================
    // Crawl Website
    // ==========================================

    async crawl(
        startUrl,
        options = {}
    ) {

        const {

            maxPages = 20,
            maxDepth = 3,
            sameDomainOnly = true,
            ignoreQueryParams = true

        } = options;

        const visited = new Set();

        const pages = [];

        const startDomain =
            new URL(startUrl).hostname;

        const queue = [

            {

                url: startUrl,

                depth: 0

            }

        ];

        while (

            queue.length > 0 &&
            pages.length < maxPages

        ) {

            const current =
                queue.shift();

            const currentUrl =
                current.url;

            const depth =
                current.depth;

            if (

                visited.has(currentUrl)

            ) {

                continue;

            }

            if (

                depth > maxDepth

            ) {

                continue;

            }

            visited.add(currentUrl);

            try {

                console.log(
                    "Crawling:",
                    currentUrl
                );

                const html =
                    await scraper.fetch(
                        currentUrl
                    );

                pages.push({

                    url: currentUrl,

                    html

                });

                const links =
                    this.extractLinks(

                        html,

                        currentUrl,

                        {

                            ignoreQueryParams

                        }

                    );

                for (

                    const link of links

                ) {

                    const parsed =
                        new URL(link);

                    if (

                        sameDomainOnly &&
                        parsed.hostname !== startDomain

                    ) {

                        continue;

                    }

                    if (

                        this.isIgnoredFile(
                            parsed.pathname
                        )

                    ) {

                        continue;

                    }

                    if (

                        !visited.has(link)

                    ) {

                        queue.push({

                            url: link,

                            depth: depth + 1

                        });

                    }

                }

            }
            catch (error) {

                console.log(
                    "Failed:",
                    currentUrl
                );

            }

        }

        return pages;

    }

    // ==========================================
    // Extract Links
    // ==========================================

    extractLinks(
        html,
        baseUrl,
        options = {}
    ) {

        const {

            ignoreQueryParams = true

        } = options;

        const $ =
            cheerio.load(html);

        const links = [];

        $("a").each((_, element) => {

            const href =
                $(element).attr("href");

            if (!href) {

                return;

            }

            try {

                const parsed =
                    new URL(
                        href,
                        baseUrl
                    );

                parsed.hash = "";

                if (

                    ignoreQueryParams

                ) {

                    parsed.search = "";

                }

                links.push(
                    parsed.href
                );

            }
            catch (error) {

            }

        });

        return [

            ...new Set(links)

        ];

    }

    // ==========================================
    // Ignore Files
    // ==========================================

    isIgnoredFile(pathname) {

        const ignored = [

            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".svg",
            ".webp",
            ".ico",

            ".pdf",

            ".zip",
            ".rar",
            ".7z",

            ".mp3",
            ".mp4",
            ".avi",
            ".mov",
            ".wav",

            ".doc",
            ".docx",

            ".xls",
            ".xlsx",

            ".ppt",
            ".pptx"

        ];

        const lower =
            pathname.toLowerCase();

        return ignored.some(

            ext =>
                lower.endsWith(ext)

        );

    }

}

const websiteCrawler =
    new WebsiteCrawler();

websiteCrawler.scraper =
    scraper;

export default websiteCrawler;
class TextChunker {

    chunkText(
        text,
        chunkSize = 1000,
        overlap = 200
    ) {

        if (!text) {
            return [];
        }

        // Normalize whitespace
        text = text
            .replace(/\r\n/g, "\n")
            .replace(/\n+/g, "\n")
            .replace(/[ \t]+/g, " ")
            .trim();

        const chunks = [];

        let start = 0;

        let iterations = 0;

        while (start < text.length) {

            iterations++;

            // Safety Guard
            if (iterations > 10000) {

                throw new Error(
                    "Chunking exceeded safe iteration limit."
                );

            }

            let end = Math.min(
                start + chunkSize,
                text.length
            );

            // Don't cut words in half
            if (end < text.length) {

                const lastSpace =
                    text.lastIndexOf(
                        " ",
                        end
                    );

                if (lastSpace > start + 100) {

                    end = lastSpace;

                }

            }

            const content =
                text
                    .substring(start, end)
                    .trim();

            if (content.length > 0) {

                chunks.push({

                    chunkIndex: chunks.length + 1,

                    content,

                    tokenCount:
                        this.estimateTokens(
                            content
                        )

                });

            }

            // Last chunk reached
            if (end >= text.length) {
                break;
            }

            // Move forward with overlap
            start = Math.max(
                end - overlap,
                start + 1
            );

        }

        return chunks;

    }

    estimateTokens(text) {

        // Approximation:
        // 1 token ≈ 4 characters

        return Math.ceil(
            text.length / 4
        );

    }

}

export default new TextChunker();
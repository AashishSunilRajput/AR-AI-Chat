class TextChunker {


    chunkText(
        text,
        chunkSize = 1000,
        overlap = 200
    ) {


        const chunks = [];


        let start = 0;


        while(start < text.length) {


            const end = start + chunkSize;


            const chunk =
                text.substring(
                    start,
                    end
                );


            chunks.push(chunk.trim());


            start =
                end - overlap;

        }


        return chunks.filter(
            chunk => chunk.length > 0
        );


    }


}


export default new TextChunker();
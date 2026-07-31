"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import knowledgeChunkService, {
    KnowledgeChunk,
} from "@/services/knowledge-chunk.service";

import embeddingService from "@/services/embedding.service";

import ChunkHeader from "@/components/knowledge/ChunkHeader";
import ChunkToolbar from "@/components/knowledge/ChunkToolbar";
import ChunkList from "@/components/knowledge/ChunkList";

export default function ChunksPage() {

    const router = useRouter();

    const params = useParams();

    const documentId = Number(
    params?.documentId
);

    const [chunks, setChunks] =
        useState<KnowledgeChunk[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [generating, setGenerating] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("all");

    // ==========================
    // Load Chunks
    // ==========================

    const loadChunks = async () => {

        try {

            setLoading(true);

            const response =
                await knowledgeChunkService.getChunks(
                    documentId
                );

            setChunks(
                response.data
            );

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

   useEffect(() => {

    if(
        documentId &&
        !isNaN(documentId)
    ){
        loadChunks();
    }

},[documentId]);
    // ==========================
    // Generate Embeddings
    // ==========================

    const generateEmbeddings = async () => {

        try {

            setGenerating(true);

            await embeddingService.generateEmbeddings(
                documentId
            );

            await loadChunks();

            alert(
                "Embeddings generated successfully."
            );

        }
        catch (error) {

            console.error(error);

            alert(
                "Embedding generation failed."
            );

        }
        finally {

            setGenerating(false);

        }

    };

    // ==========================
    // Search + Filter
    // ==========================

    const filteredChunks = useMemo(() => {

        return chunks.filter((chunk) => {

            const matchSearch =
                chunk.content
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            let matchFilter = true;

            if (filter === "generated") {

                matchFilter =
                    !!chunk.embeddings?.length;

            }

            if (filter === "pending") {

                matchFilter =
                    !chunk.embeddings?.length;

            }

            return (
                matchSearch &&
                matchFilter
            );

        });

    }, [chunks, search, filter]);

    if (loading) {

        return (

            <div className="p-10">

                Loading Chunks...

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <ChunkHeader

                totalChunks={
                    chunks.length
                }

                generating={
                    generating
                }

                onBack={() =>
                    router.back()
                }

                onGenerate={
                    generateEmbeddings
                }

            />

            <ChunkToolbar

                search={search}

                onSearch={setSearch}

                filter={filter}

                onFilter={setFilter}

                onRefresh={loadChunks}

            />

            <ChunkList

                chunks={
                    filteredChunks
                }

            />

        </div>

    );

}
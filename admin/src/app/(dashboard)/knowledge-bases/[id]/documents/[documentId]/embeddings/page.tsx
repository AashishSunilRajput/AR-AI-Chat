"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import embeddingService, {
    Embedding
} from "@/services/embedding.service";

import EmbeddingHeader from "@/components/knowledge/EmbeddingHeader";
import EmbeddingStats from "@/components/knowledge/EmbeddingStats";
import EmbeddingToolbar from "@/components/knowledge/EmbeddingToolbar";
import EmbeddingList from "@/components/knowledge/EmbeddingList";

export default function EmbeddingsPage() {
const router = useRouter();

const params = useParams();

const documentId = Number(params.documentId);

const [embeddings, setEmbeddings] =
    useState<Embedding[]>([]);

const [loading, setLoading] =
    useState(true);

const [search, setSearch] =
    useState("");

    const loadEmbeddings = async () => {

    try {

        setLoading(true);

        const response =
            await embeddingService.getEmbeddings(
                documentId
            );

        setEmbeddings(
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

    if (documentId) {

        loadEmbeddings();

    }

}, [documentId]);

const filteredEmbeddings =
    useMemo(() => {

        return embeddings.filter(

            (item) =>

                item.model
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                item.provider
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );

    }, [embeddings, search]);

    const totalEmbeddings =
    embeddings.length;

const totalTokens =
    embeddings.reduce(

        (sum, item) =>

            sum +
            (item.tokenCount || 0),

        0

    );

const provider =
    embeddings[0]?.provider || "-";

const model =
    embeddings[0]?.model || "-";

    if (loading) {

    return (

        <div className="p-10">

            Loading Embeddings...

        </div>

    );
}

    return (

    <div className="space-y-6">

        <EmbeddingHeader

            totalEmbeddings={
                totalEmbeddings
            }

            onBack={() =>
                router.back()
            }

        />

        <EmbeddingStats

            totalEmbeddings={
                totalEmbeddings
            }

            totalTokens={
                totalTokens
            }

            provider={
                provider
            }

            model={
                model
            }

        />

        <EmbeddingToolbar

            search={search}

            onSearch={setSearch}

            onRefresh={
                loadEmbeddings
            }

        />

        <EmbeddingList

            embeddings={
                filteredEmbeddings
            }

        />

    </div>

);
}



    
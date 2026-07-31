"use client";

import ChunkCard from "./ChunkCard";
import EmptyState from "@/components/common/EmptyState";

import { KnowledgeChunk } from "@/services/knowledge-chunk.service";

interface ChunkListProps {

    chunks: KnowledgeChunk[];

}

export default function ChunkList({

    chunks

}: ChunkListProps) {

    if (chunks.length === 0) {

        return (

            <EmptyState

                title="No Chunks Found"

                description="Generate chunks from a document to see them here."

            />

        );

    }

    return (

        <div

            className="
                grid
                gap-5
            "

        >

            {

                chunks.map((chunk) => (

                    <ChunkCard

                        key={chunk.id}

                        chunk={chunk}

                    />

                ))

            }

        </div>

    );

}
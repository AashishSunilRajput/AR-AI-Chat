"use client";


import EmbeddingCard from "./EmbeddingCard";

import EmptyState from "@/components/common/EmptyState";

import {
    Embedding
} from "@/services/embedding.service";


interface Props {

    embeddings: Embedding[];

}



export default function EmbeddingList({

    embeddings

}: Props) {


    if (embeddings.length === 0) {

        return (

            <EmptyState

                title="No Embeddings Found"

                description="Generate embeddings from chunks to see them here."

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
                embeddings.map((embedding)=>(

                    <EmbeddingCard

                        key={
                            embedding.id
                        }

                        embedding={
                            embedding
                        }

                    />

                ))
            }


        </div>

    );

}
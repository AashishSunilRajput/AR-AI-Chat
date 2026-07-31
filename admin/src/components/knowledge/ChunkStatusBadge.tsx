"use client";

interface Props {

    generated: boolean;

}

export default function ChunkStatusBadge({

    generated

}: Props) {

    if (generated) {

        return (

            <span
                className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-green-700
                "
            >

                🟢 Generated

            </span>

        );

    }

    return (

        <span
            className="
                inline-flex
                items-center
                rounded-full
                bg-yellow-100
                px-3
                py-1
                text-xs
                font-medium
                text-yellow-700
            "
        >

            🟡 Pending

        </span>

    );

}
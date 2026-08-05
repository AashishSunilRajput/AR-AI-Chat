"use client";

interface Props {

    currentPage: number;

    totalPages: number;

    onPageChange: (page: number) => void;

}

export default function Pagination({

    currentPage,

    totalPages,

    onPageChange

}: Props) {

    if (totalPages <= 1) {

        return null;

    }

    return (

        <div className="flex items-center justify-center gap-4">

            <button

                disabled={currentPage === 1}

                onClick={() =>
                    onPageChange(currentPage - 1)
                }

                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                "

            >

                Previous

            </button>

            <span className="font-medium">

                Page {currentPage} of {totalPages}

            </span>

            <button

                disabled={
                    currentPage === totalPages
                }

                onClick={() =>
                    onPageChange(currentPage + 1)
                }

                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                "

            >

                Next

            </button>

        </div>

    );

}
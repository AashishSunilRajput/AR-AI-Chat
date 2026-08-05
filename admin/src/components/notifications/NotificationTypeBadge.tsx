"use client";

interface Props {

    type:
        | "INFO"
        | "SUCCESS"
        | "WARNING"
        | "ERROR";

}

export default function NotificationTypeBadge({

    type

}: Props) {

    const config = {

        INFO: {

            label: "Info",

            className:
                "bg-blue-100 text-blue-700 border-blue-200"

        },

        SUCCESS: {

            label: "Success",

            className:
                "bg-green-100 text-green-700 border-green-200"

        },

        WARNING: {

            label: "Warning",

            className:
                "bg-yellow-100 text-yellow-700 border-yellow-200"

        },

        ERROR: {

            label: "Error",

            className:
                "bg-red-100 text-red-700 border-red-200"

        }

    };

    const badge =

        config[type] ||

        config.INFO;

    return (

        <span

            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}

        >

            {badge.label}

        </span>

    );

}
"use client";

interface Props {

    type:
        | "NEW_LEAD"
        | "NEW_VISITOR"
        | "NEW_CONVERSATION"
        | "KNOWLEDGE_IMPORTED"
        | "KNOWLEDGE_FAILED"
        | "CHATBOT_UPDATED"
        | "CHATBOT_DISABLED"
        | "USER_CREATED"
        | "ORGANIZATION_CREATED"
        | "SYSTEM";

}

export default function NotificationTypeBadge({

    type

}: Props) {

    const config = {

        NEW_LEAD: {

            label: "Lead",

            className:
                "bg-green-100 text-green-700 border-green-200"

        },

        NEW_VISITOR: {

            label: "Visitor",

            className:
                "bg-blue-100 text-blue-700 border-blue-200"

        },

        NEW_CONVERSATION: {

            label: "Conversation",

            className:
                "bg-purple-100 text-purple-700 border-purple-200"

        },

        KNOWLEDGE_IMPORTED: {

            label: "Knowledge Imported",

            className:
                "bg-emerald-100 text-emerald-700 border-emerald-200"

        },

        KNOWLEDGE_FAILED: {

            label: "Knowledge Failed",

            className:
                "bg-red-100 text-red-700 border-red-200"

        },

        CHATBOT_UPDATED: {

            label: "Chatbot Updated",

            className:
                "bg-cyan-100 text-cyan-700 border-cyan-200"

        },

        CHATBOT_DISABLED: {

            label: "Chatbot Disabled",

            className:
                "bg-orange-100 text-orange-700 border-orange-200"

        },

        USER_CREATED: {

            label: "User Created",

            className:
                "bg-indigo-100 text-indigo-700 border-indigo-200"

        },

        ORGANIZATION_CREATED: {

            label: "Organization",

            className:
                "bg-pink-100 text-pink-700 border-pink-200"

        },

        SYSTEM: {

            label: "System",

            className:
                "bg-slate-100 text-slate-700 border-slate-200"

        }

    };

    const badge = config[type];

    return (

        <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
        >

            {badge.label}

        </span>

    );

}
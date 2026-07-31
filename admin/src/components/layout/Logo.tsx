"use client";

import { BotMessageSquare } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-3 px-6 py-5 border-b">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">

                <BotMessageSquare size={22} />

            </div>

            <div>

                <h2 className="text-lg font-bold tracking-tight">

                    AR AI Chat

                </h2>

                <p className="text-xs text-muted-foreground">

                    Admin Panel

                </p>

            </div>

        </div>
    );
}
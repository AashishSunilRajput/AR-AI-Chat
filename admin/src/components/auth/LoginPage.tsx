"use client";

import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-slate-950">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Section */}

                <div className="hidden lg:flex flex-col justify-center px-20 text-white">

                    <span className="inline-flex w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                        AR AI CHAT
                    </span>

                    <h1 className="mt-8 text-6xl font-bold leading-tight">

                        Enterprise

                        <br />

                        AI Chat Platform

                    </h1>

                    <p className="mt-8 max-w-xl text-lg text-slate-300 leading-8">

                        Build AI Chatbots, Manage Customers,

                        Track Leads and Analyze Conversations

                        from one powerful dashboard.

                    </p>

                </div>

                {/* Right Section */}

                <div className="flex items-center justify-center bg-white">

                    <LoginForm />

                </div>

            </div>

        </main>
    );
}
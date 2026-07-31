"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {

    children: ReactNode;

}

export default function DashboardLayout({

    children

}: Props) {

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar />

                <main
                    className="
                        flex-1
                        overflow-auto
                        p-6
                    "
                >

                    {children}

                </main>

            </div>

        </div>

    );

}
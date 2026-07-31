"use client";


import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { useState } from "react";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    const [mobileOpen, setMobileOpen] = useState(false);


    return (

        <div className="flex h-screen bg-slate-100">


            {/* Sidebar */}

            <Sidebar />


            <div className="flex flex-1 flex-col">


                {/* Navbar */}

                <Navbar
                    onMenuClick={() =>
                        setMobileOpen(!mobileOpen)
                    }
                />



                {/* Content */}

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        p-6
                    "
                >

                    {children}

                </main>


            </div>


        </div>

    );

}
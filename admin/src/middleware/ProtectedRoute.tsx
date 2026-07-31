"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({

    children,

}: {

    children: React.ReactNode;

}) {

    const {

        loading,

        isAuthenticated,

    } = useAuth();

    const router = useRouter();

    useEffect(() => {

        if (

            !loading &&

            !isAuthenticated

        ) {

            router.replace("/");

        }

    }, [

        loading,

        isAuthenticated,

        router,

    ]);

    if (

        loading ||

        !isAuthenticated

    ) {

        return (

            <div className="flex h-screen items-center justify-center">

                Loading...

            </div>

        );

    }

    return children;

}
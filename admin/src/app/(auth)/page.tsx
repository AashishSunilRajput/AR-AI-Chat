"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import LoginPage from "@/components/auth/LoginPage";

import { useAuth } from "@/context/AuthContext";

export default function HomePage() {

    const {

        isAuthenticated,

        loading,

    } = useAuth();

    const router = useRouter();

    useEffect(() => {

        if (

            !loading &&

            isAuthenticated

        ) {

            router.replace("/dashboard");

        }

    }, [

        isAuthenticated,

        loading,

        router,

    ]);

    if (loading) {

        return null;

    }

    return <LoginPage />;

}
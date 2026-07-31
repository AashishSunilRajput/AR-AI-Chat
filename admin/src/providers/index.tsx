"use client";

import QueryProvider from "./query-provider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
        />
      </AuthProvider>
    </QueryProvider>
  );
}
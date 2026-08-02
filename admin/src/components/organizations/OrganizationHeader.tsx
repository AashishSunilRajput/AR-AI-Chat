"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";

interface Props {
    organization: any;
}

export default function OrganizationHeader({
    organization,
}: Props) {

    const router = useRouter();

    const logoUrl = organization.logo
        ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${organization.logo}`
        : null;

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div className="flex items-center gap-5">

                    <button
                        onClick={() => router.back()}
                        className="rounded-lg border p-2 hover:bg-slate-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    {
                        logoUrl ? (

                            <img
                                src={logoUrl}
                                alt={organization.name}
                                className="h-20 w-20 rounded-2xl border object-cover"
                            />

                        ) : (

                            <div
                                className="
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-2xl
                                bg-blue-100
                                text-3xl
                                font-bold
                                text-blue-700
                                "
                            >
                                {organization.name.charAt(0)}
                            </div>

                        )
                    }

                    <div>

                        <h1 className="text-3xl font-bold">
                            {organization.name}
                        </h1>

                        <p className="mt-1 text-slate-500">
                            {organization.email}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">

                            <span
                                className="
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-sm
                                font-medium
                                text-blue-700
                                "
                            >
                                {organization.plan}
                            </span>

                            <span
                                className={`
                                    rounded-full
                                    px-3
                                    py-1
                                    text-sm
                                    font-medium

                                    ${
                                        organization.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }
                                `}
                            >
                                {organization.status}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <button
                    onClick={() =>
                        router.push(
                            `/organizations/${organization.id}/edit`
                        )
                    }
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    font-medium
                    text-white
                    hover:bg-blue-700
                    "
                >
                    <Pencil className="h-4 w-4" />

                    Edit Organization

                </button>

            </div>

        </div>

    );

}
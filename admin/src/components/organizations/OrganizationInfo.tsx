"use client";

import {
    Building2,
    Mail,
    Phone,
    Globe,
    MapPin,
    Clock,
    Languages,
} from "lucide-react";

interface Props {
    organization: any;
}

export default function OrganizationInfo({
    organization,
}: Props) {

    const settings = organization.settings || {};

    const rows = [

        {
            icon: Building2,
            label: "Organization",
            value: organization.name || "-",
        },

        {
            icon: Mail,
            label: "Email",
            value: organization.email || "-",
        },

        {
            icon: Phone,
            label: "Phone",
            value: organization.phone || "-",
        },

        {
            icon: Globe,
            label: "Website",
            value: organization.website || "-",
        },

        {
            icon: MapPin,
            label: "Address",
            value:
                settings.companyAddress
                    ? `${settings.companyAddress},
                       ${settings.companyCity || ""},
                       ${settings.companyState || ""},
                       ${settings.companyCountry || ""}`
                    : "-",
        },

        {
            icon: Clock,
            label: "Timezone",
            value: settings.timezone || "-",
        },

        {
            icon: Languages,
            label: "Language",
            value: settings.language || "-",
        },

    ];

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">

                Company Information

            </h2>

            <div className="space-y-5">

                {

                    rows.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={item.label}
                                className="
                                flex
                                items-start
                                gap-4
                                border-b
                                pb-4
                                last:border-0
                                last:pb-0
                                "
                            >

                                <div
                                    className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-slate-100
                                    "
                                >

                                    <Icon className="h-5 w-5 text-slate-600" />

                                </div>

                                <div className="flex-1">

                                    <p className="text-sm text-slate-500">

                                        {item.label}

                                    </p>

                                    {

                                        item.label === "Website" &&
                                        organization.website ? (

                                            <a
                                                href={organization.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                {organization.website}
                                            </a>

                                        ) : (

                                            <p className="font-medium break-words">

                                                {item.value}

                                            </p>

                                        )

                                    }

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}
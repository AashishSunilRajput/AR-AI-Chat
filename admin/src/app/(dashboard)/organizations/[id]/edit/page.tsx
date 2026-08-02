"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import RoleGuard from "@/components/auth/RoleGuard";
import EditOrganizationForm from "@/components/organizations/EditOrganizationForm";

import organizationService from "@/services/organization.service";

export default function EditOrganizationPage() {

    const params = useParams();

    const organizationId = Number(params.id);

    const [organization, setOrganization] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        if (organizationId) {

            loadOrganization();

        }

    }, [organizationId]);

    const loadOrganization = async () => {

        try {

            const response =
                await organizationService.getById(
                    organizationId
                );

            setOrganization(
                response.data
            );

        }

        catch (err: any) {

            setError(

                err.response?.data?.message ||

                "Organization not found"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <RoleGuard
            allowedRoles={[
                "SUPER_ADMIN"
            ]}
        >

            {

                loading ?

                    (

                        <div className="p-10">

                            Loading...

                        </div>

                    )

                    :

                    error ?

                        (

                            <div className="rounded-xl bg-red-100 p-5 text-red-700">

                                {error}

                            </div>

                        )

                        :

                        organization ?

                            (

                                <EditOrganizationForm
                                    organization={organization}
                                />

                            )

                            :

                            null

            }

        </RoleGuard>

    );

}
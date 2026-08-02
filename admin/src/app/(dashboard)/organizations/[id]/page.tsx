"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import organizationService from "@/services/organization.service";

import OrganizationHeader from "@/components/organizations/OrganizationHeader";
import OrganizationStats from "@/components/organizations/OrganizationStats";
import OrganizationInfo from "@/components/organizations/OrganizationInfo";
import OrganizationUsers from "@/components/organizations/OrganizationUsers";
import OrganizationChatbots from "@/components/organizations/OrganizationChatbots";
import OrganizationKnowledgeBases from "@/components/organizations/OrganizationKnowledgeBases";

export default function OrganizationDetailPage() {

    const params = useParams();

    const organizationId = Number(params.id);

    const [loading, setLoading] = useState(true);

    const [organization, setOrganization] =
        useState<any>(null);

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
console.log(response);
            setOrganization(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="p-10">

                Loading organization...

            </div>

        );

    }

    if (!organization) {

        return (

            <div className="p-10 text-red-600">

                Organization not found.

            </div>

        );

    }

    return (

        <div className="space-y-6 p-6">

            {/* Header */}

            <OrganizationHeader
                organization={organization}
            />

            {/* Stats */}

            <OrganizationStats
                stats={organization.stats}
            />

            {/* Company Information */}

            <OrganizationInfo
                organization={organization}
            />

            {/* Users */}

            <OrganizationUsers
                users={organization.users}
            />

            {/* Chatbots */}

            <OrganizationChatbots
                chatbots={organization.chatbots}
            />

            {/* Knowledge Bases */}

            <OrganizationKnowledgeBases
                knowledgeBases={
                    organization.knowledgeBases
                }
            />

        </div>

    );

}
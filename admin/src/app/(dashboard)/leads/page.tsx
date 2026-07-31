"use client";

import { useEffect, useState } from "react";

import leadService, {
    Lead,
    LeadStats as LeadStatsType,
} from "@/services/lead.service";

import LeadStats from "@/components/leads/LeadStats";
import LeadFilters from "@/components/leads/LeadFilters";
import LeadTable from "@/components/leads/LeadTable";

export default function LeadsPage() {

    const [loading, setLoading] = useState(true);

    const [leads, setLeads] = useState<Lead[]>([]);

    const [stats, setStats] =
        useState<LeadStatsType>({
            total: 0,
            new: 0,
            contacted: 0,
            qualified: 0,
            converted: 0,
            lost: 0,
        });

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("ALL");

    // ======================================
    // Load Data
    // ======================================

    const loadData = async () => {

        const [
    leadsResponse,
    statsResponse,
] = await Promise.all([
    leadService.getLeads(),
    leadService.getStats(),
]);

console.log("LEADS:", leadsResponse);
console.log("STATS:", statsResponse);

setLeads(leadsResponse.data);
setStats(statsResponse.data);
        try {

            setLoading(true);

            const [
                leadsResponse,
                statsResponse,
            ] = await Promise.all([

                leadService.getLeads(),

                leadService.getStats(),

            ]);

            setLeads(
                leadsResponse.data
            );

            setStats(
                statsResponse.data
            );

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    // ======================================
    // Filter
    // ======================================

    const filteredLeads = leads.filter((lead) => {

        const keyword =
            search.toLowerCase();

        const matchesSearch =

            lead.name
                ?.toLowerCase()
                .includes(keyword)

            ||

            lead.email
                ?.toLowerCase()
                .includes(keyword)

            ||

            lead.phone
                ?.toLowerCase()
                .includes(keyword);

        const matchesStatus =

            status === "ALL"

                ? true

                : lead.status === status;

        return (
            matchesSearch &&
            matchesStatus
        );

    });

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Leads

                </h1>

                <p className="mt-2 text-slate-500">

                    Manage all customer leads

                </p>

            </div>

            <LeadStats
                stats={stats}
            />

            <LeadFilters
                search={search}
                onSearchChange={setSearch}
                status={status}
                onStatusChange={setStatus}
            />

            <LeadTable
                loading={loading}
                leads={filteredLeads}
            />

        </div>

    );

}
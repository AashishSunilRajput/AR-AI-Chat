"use client";

import { useEffect, useState } from "react";

import StatsGrid from "@/components/dashboard/StatsGrid";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import RecentLeads from "@/components/dashboard/RecentLeads";
import RecentConversations from "@/components/dashboard/RecentConversations";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import AIUsageCard from "@/components/dashboard/AIUsageCard";
import SystemStatus from "@/components/dashboard/SystemStatus";

import dashboardService from "@/services/dashboard.service";

export default function DashboardPage() {

    const [stats, setStats] = useState<any>(null);

    const [organization, setOrganization] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await dashboardService.getStats();

            setStats(
                response.data.stats
            );

            setOrganization(
                response.data.organization
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

            <div className="flex h-[70vh] items-center justify-center">

                <div className="text-lg font-medium text-slate-500">

                    Loading Dashboard...

                </div>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold">

                    {organization?.name || "Dashboard"}

                </h1>

                <p className="mt-2 text-slate-500">

                    {organization
                        ? `Current Plan: ${organization.plan}`
                        : "Welcome back 👋"}

                </p>

            </div>

            {/* Stats */}

            <StatsGrid stats={stats} />

            {/* Analytics */}

            <AnalyticsChart />

            {/* Leads & Conversations */}

            <div className="grid gap-6 lg:grid-cols-2">

                <RecentLeads />

                <RecentConversations />

            </div>

            {/* Quick Actions */}

            <div className="grid gap-6 xl:grid-cols-2">

                <QuickActions />

                <ActivityTimeline />

            </div>

            {/* AI Usage */}

            <div className="grid gap-6 xl:grid-cols-2">

                <AIUsageCard />

                <SystemStatus />

            </div>

        </div>

    );

}
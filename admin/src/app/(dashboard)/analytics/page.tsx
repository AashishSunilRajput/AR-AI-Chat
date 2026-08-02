"use client";

import { useEffect, useState } from "react";

import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import MonthlyTrendChart from "@/components/analytics/MonthlyTrendChart";

import analyticsService, {
    OverviewAnalytics,
    LeadAnalytics,
    VisitorAnalytics,
    ConversationAnalytics
} from "@/services/analytics.service";

export default function AnalyticsPage() {

    const [overview, setOverview] =
        useState<OverviewAnalytics>();

    const [leadAnalytics, setLeadAnalytics] =
        useState<LeadAnalytics>();

    const [visitorAnalytics, setVisitorAnalytics] =
        useState<VisitorAnalytics>();

    const [conversationAnalytics, setConversationAnalytics] =
        useState<ConversationAnalytics>();

    const [loading, setLoading] =
        useState(true);

    const loadData = async () => {

        try {

            const [

                overviewRes,

                leadRes,

                visitorRes,

                conversationRes

            ] = await Promise.all([

                analyticsService.getOverview(),

                analyticsService.getLeadAnalytics(),

                analyticsService.getVisitorAnalytics(),

                analyticsService.getConversationAnalytics()

            ]);

            setOverview(
                overviewRes.data
            );

            setLeadAnalytics(
                leadRes.data
            );

            setVisitorAnalytics(
                visitorRes.data
            );

            setConversationAnalytics(
                conversationRes.data
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

    if (loading) {

        return (

            <div className="p-6">

                Loading...

            </div>

        );

    }

    return (

        <div className="space-y-8 p-6">

            {/* ========================================== */}
            {/* Header */}
            {/* ========================================== */}

            <div>

                <h1 className="text-3xl font-bold">

                    Analytics

                </h1>

                <p className="text-slate-500">

                    Chatbot performance analytics

                </p>

            </div>

            {/* ========================================== */}
            {/* Overview */}
            {/* ========================================== */}

            {overview && (

                <AnalyticsStats

                    title="Overview"

                    stats={[

                        {

                            title: "Total Visitors",

                            value: overview.totalVisitors

                        },

                        {

                            title: "Total Conversations",

                            value: overview.totalConversations

                        },

                        {

                            title: "Total Leads",

                            value: overview.totalLeads

                        },

                        {

                            title: "Conversion Rate",

                            value: `${overview.conversionRate}%`

                        }

                    ]}

                />

            )}

            {/* ========================================== */}
            {/* Lead Analytics */}
            {/* ========================================== */}

            {leadAnalytics && (

                <>

                    <AnalyticsStats

                        title="Lead Analytics"

                        stats={[

                            {

                                title: "New",

                                value: leadAnalytics.new

                            },

                            {

                                title: "Contacted",

                                value: leadAnalytics.contacted

                            },

                            {

                                title: "Qualified",

                                value: leadAnalytics.qualified

                            },

                            {

                                title: "Converted",

                                value: leadAnalytics.converted

                            },

                            {

                                title: "Lost",

                                value: leadAnalytics.lost

                            }

                        ]}

                    />

                    <MonthlyTrendChart

                        title="Lead Monthly Trend"

                        data={leadAnalytics.monthlyTrend}

                    />

                </>

            )}

            {/* ========================================== */}
            {/* Visitor Analytics */}
            {/* ========================================== */}

            {visitorAnalytics && (

                <>

                    <AnalyticsStats

                        title="Visitor Analytics"

                        stats={[

                            {

                                title: "Total Visitors",

                                value: visitorAnalytics.totalVisitors

                            },

                            {

                                title: "With Leads",

                                value: visitorAnalytics.visitorsWithLeads

                            },

                            {

                                title: "Without Leads",

                                value: visitorAnalytics.visitorsWithoutLeads

                            },

                            {

                                title: "Returning Visitors",

                                value: visitorAnalytics.returningVisitors

                            }

                        ]}

                    />

                    <MonthlyTrendChart

                        title="Visitor Monthly Trend"

                        data={visitorAnalytics.monthlyTrend}

                    />

                </>

            )}

            {/* ========================================== */}
            {/* Conversation Analytics */}
            {/* ========================================== */}

            {conversationAnalytics && (

                <>

                    <AnalyticsStats

                        title="Conversation Analytics"

                        stats={[

                            {

                                title: "Total",

                                value: conversationAnalytics.totalConversations

                            },

                            {

                                title: "Active",

                                value: conversationAnalytics.activeConversations

                            },

                            {

                                title: "Closed",

                                value: conversationAnalytics.closedConversations

                            },

                            {

                                title: "Messages",

                                value: conversationAnalytics.totalMessages

                            },

                            {

                                title: "User",

                                value: conversationAnalytics.userMessages

                            },

                            {

                                title: "AI",

                                value: conversationAnalytics.aiMessages

                            },

                            {

                                title: "Avg Msg",

                                value: conversationAnalytics.averageMessages

                            }

                        ]}

                    />

                    <MonthlyTrendChart

                        title="Conversation Monthly Trend"

                        data={conversationAnalytics.monthlyTrend}

                    />

                </>

            )}

        </div>

    );

}
import prisma from "../config/prisma.js";

class AnalyticsRepository {

    // ==========================================
    // Overview
    // ==========================================

    async getOverview(organizationId) {

        const where = organizationId
            ? { organizationId }
            : {};

        const [
            totalVisitors,
            totalConversations,
            totalLeads,
            activeConversations,
            convertedLeads,
            totalMessages
        ] = await Promise.all([

            prisma.visitor.count({
                where
            }),

            prisma.conversation.count({
                where: {
                    chatbot: where
                }
            }),

            prisma.lead.count({
                where
            }),

            prisma.conversation.count({
                where: {
                    chatbot: where,
                    status: "ACTIVE"
                }
            }),

            prisma.lead.count({
                where: {
                    ...where,
                    status: "CONVERTED"
                }
            }),

            prisma.message.count({
                where: {
                    conversation: {
                        chatbot: where
                    }
                }
            })

        ]);

        const conversionRate =
            totalLeads === 0
                ? 0
                : Number(
                    (
                        (convertedLeads / totalLeads) *
                        100
                    ).toFixed(1)
                );

        const averageMessages =
            totalConversations === 0
                ? 0
                : Number(
                    (
                        totalMessages /
                        totalConversations
                    ).toFixed(1)
                );

        return {

            totalVisitors,

            totalConversations,

            totalLeads,

            activeConversations,

            convertedLeads,

            conversionRate,

            averageMessages

        };

    }

    // ==========================================
// Lead Analytics
// ==========================================

async getLeadAnalytics(organizationId) {

    const where = organizationId
        ? { organizationId }
        : {};

    const [
        newLeads,
        contacted,
        qualified,
        converted,
        lost
    ] = await Promise.all([

        prisma.lead.count({
            where: {
                ...where,
                status: "NEW"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "CONTACTED"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "QUALIFIED"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "CONVERTED"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "LOST"
            }
        })

    ]);

    return {

        new: newLeads,

        contacted,

        qualified,

        converted,

        lost

    };

}


// ==========================================
// Monthly Lead Trend (Last 6 Months)
// ==========================================

async getMonthlyLeadTrend(organizationId = null) {

    const where = organizationId
        ? {
            organizationId
        }
        : {};


    const leads = await prisma.lead.findMany({

        where,

        select: {

            createdAt: true

        }

    });


    const months = [];

    for (let i = 5; i >= 0; i--) {

        const date = new Date();

        date.setMonth(
            date.getMonth() - i
        );

        months.push({

            month:
                date.toLocaleString(
                    "en-US",
                    {
                        month: "short"
                    }
                ),

            year:
                date.getFullYear(),

            count: 0

        });

    }


    leads.forEach((lead) => {

        const date =
            new Date(
                lead.createdAt
            );


        const month =
            date.toLocaleString(
                "en-US",
                {
                    month: "short"
                }
            );


        const year =
            date.getFullYear();


        const item =
            months.find(
                (m) =>
                    m.month === month &&
                    m.year === year
            );


        if (item) {

            item.count++;

        }

    });


    return months.map(
        (m) => ({

            month: m.month,

            count: m.count

        })
    );

}


// ==========================================
// Visitor Analytics
// ==========================================

async getVisitorAnalytics(organizationId = null) {

    const where = organizationId
        ? {
            organizationId
        }
        : {};


    const totalVisitors =
        await prisma.visitor.count({

            where

        });


    const visitorsWithLeads =
        await prisma.visitor.count({

            where: {

                ...where,

                leads: {

                    some: {}

                }

            }

        });


    const visitorsWithoutLeads =
        totalVisitors - visitorsWithLeads;



    const returningVisitors =
        await prisma.visitor.count({

            where: {

                ...where,

                conversations: {

                    some: {}

                }

            }

        });



    return {

        totalVisitors,

        visitorsWithLeads,

        visitorsWithoutLeads,

        returningVisitors

    };

}

// ==========================================
// Monthly Visitor Trend
// ==========================================

async getMonthlyVisitorTrend(organizationId = null) {


    const where = organizationId
        ? {
            organizationId
        }
        :
        {};



    const visitors =
        await prisma.visitor.findMany({

            where,

            select: {

                createdAt: true

            }

        });



    const months = [];


    for(let i = 5; i >= 0; i--) {

        const date =
            new Date();


        date.setMonth(
            date.getMonth() - i
        );


        months.push({

            month:
                date.toLocaleString(
                    "en-US",
                    {
                        month:"short"
                    }
                ),

            year:
                date.getFullYear(),

            count:0

        });

    }



    visitors.forEach(visitor => {


        const date =
            new Date(
                visitor.createdAt
            );


        const month =
            date.toLocaleString(
                "en-US",
                {
                    month:"short"
                }
            );


        const year =
            date.getFullYear();



        const item =
            months.find(
                m =>
                m.month === month &&
                m.year === year
            );


        if(item){

            item.count++;

        }


    });



    return months.map(m => ({

        month:m.month,

        count:m.count

    }));

}

// ==========================================
// Conversation Analytics
// ==========================================

async getConversationAnalytics(organizationId = null) {


    const conversationWhere =
        organizationId
        ? {
            chatbot: {
                organizationId
            }
        }
        :
        {};



    const totalConversations =
        await prisma.conversation.count({

            where: conversationWhere

        });



    const activeConversations =
        await prisma.conversation.count({

            where: {

                ...conversationWhere,

                status: "ACTIVE"

            }

        });



    const closedConversations =
        await prisma.conversation.count({

            where: {

                ...conversationWhere,

                status: "CLOSED"

            }

        });



    const messageWhere =
        organizationId
        ? {
            conversation: {

                chatbot: {

                    organizationId

                }

            }
        }
        :
        {};



    const totalMessages =
        await prisma.message.count({

            where: messageWhere

        });



    const userMessages =
        await prisma.message.count({

            where: {

                ...messageWhere,

                role:"USER"

            }

        });



    const aiMessages =
        await prisma.message.count({

            where: {

                ...messageWhere,

                role:"ASSISTANT"

            }

        });



    const averageMessages =
        totalConversations > 0
        ?
        Number(
            (
                totalMessages /
                totalConversations
            )
            .toFixed(2)
        )
        :
        0;



    return {

        totalConversations,

        activeConversations,

        closedConversations,

        totalMessages,

        userMessages,

        aiMessages,

        averageMessages

    };

}

// ==========================================
// Monthly Conversation Trend
// ==========================================

async getMonthlyConversationTrend(
    organizationId = null
) {


    const where =
        organizationId
        ?
        {
            chatbot:{
                organizationId
            }
        }
        :
        {};



    const conversations =
        await prisma.conversation.findMany({

            where,

            select:{

                createdAt:true

            }

        });



    const months=[];



    for(let i=5;i>=0;i--){


        const date =
            new Date();


        date.setMonth(
            date.getMonth()-i
        );


        months.push({

            month:
                date.toLocaleString(
                    "en-US",
                    {
                        month:"short"
                    }
                ),

            year:
                date.getFullYear(),

            count:0

        });


    }



    conversations.forEach(item=>{


        const date =
            new Date(
                item.createdAt
            );


        const month =
            date.toLocaleString(
                "en-US",
                {
                    month:"short"
                }
            );


        const year =
            date.getFullYear();



        const found =
            months.find(
                m =>
                m.month===month &&
                m.year===year
            );


        if(found){

            found.count++;

        }


    });



    return months.map(m=>({

        month:m.month,

        count:m.count

    }));

}

}
export default new AnalyticsRepository();
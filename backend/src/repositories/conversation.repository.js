import prisma from "../config/prisma.js";

class ConversationRepository {

    // ==========================================
    // Create Conversation
    // ==========================================

    async create(data) {

        return await prisma.conversation.create({

            data,

            include: {

                visitor: true,

                chatbot: true

            }

        });

    }

    // ==========================================
    // Active Conversation
    // ==========================================

    async findActive(visitorId, chatbotId) {

        return await prisma.conversation.findFirst({

            where: {

                visitorId,

                chatbotId,

                status: "ACTIVE"

            },

            include: {

                visitor: true,

                chatbot: true

            }

        });

    }

// ==========================================
// Find By Id
// ==========================================

async findById(id) {

    console.log("SEARCHING CONVERSATION ID:", id);

    const conversation =
        await prisma.conversation.findUnique({

            where: {

                id: Number(id)

            },

            include: {

                visitor: true,

                chatbot: true,

                leads: true,

                messages: {

                    orderBy: {

                        createdAt: "asc"

                    }

                }

            }

        });


    console.log(
        "DATABASE RESULT:",
        conversation
    );


    return conversation;

}

    // ==========================================
    // Close Conversation
    // ==========================================

async close(id) {
    return await prisma.conversation.update({
        where: {
            id: Number(id)
        },
        data: {
            status: "CLOSED",
            endedAt: new Date()
        },
        include: {
            visitor: true,
            chatbot: true,
            messages: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });
}

    
// ==========================================
// Get All Conversations
// ==========================================

async findAll(filters = {}) {

    const {

        search,

        page = 1,

        limit = 10

    } = filters;

    const where = {};

    if (search) {

        where.OR = [

            {

                visitor: {

                    name: {

                        contains: search,

                        mode: "insensitive"

                    }

                }

            },

            {

                visitor: {

                    email: {

                        contains: search,

                        mode: "insensitive"

                    }

                }

            },

            {

                chatbot: {

                    name: {

                        contains: search,

                        mode: "insensitive"

                    }

                }

            }

        ];

    }

    const skip =
        (Number(page) - 1) *
        Number(limit);

    const [

        conversations,

        total

    ] = await Promise.all([

        prisma.conversation.findMany({

            where,

            skip,

            take: Number(limit),

            include: {

                visitor: true,

                chatbot: true,

                _count: {

                    select: {

                        messages: true

                    }

                }

            },

            orderBy: {

                id: "desc"

            }

        }),

        prisma.conversation.count({

            where

        })

    ]);

    return {

        data: conversations,

        pagination: {

            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(

                total /

                Number(limit)

            )

        }

    };

}

// ==========================================
// Get Conversations By Organization
// ==========================================

async findAllByOrganization(

    organizationId,

    filters = {}

) {

    const {

        search,

        page = 1,

        limit = 10

    } = filters;

    const where = {

        chatbot: {

            organizationId:

                Number(organizationId)

        }

    };

    if (search) {

        where.OR = [

            {

                visitor: {

                    name: {

                        contains: search,

                        mode: "insensitive"

                    }

                }

            },

            {

                visitor: {

                    email: {

                        contains: search,

                        mode: "insensitive"

                    }

                }

            },

            {

                chatbot: {

                    name: {

                        contains: search,

                        mode: "insensitive"

                    }

                }

            }

        ];

    }

    const skip =
        (Number(page) - 1) *
        Number(limit);

    const [

        conversations,

        total

    ] = await Promise.all([

        prisma.conversation.findMany({

            where,

            skip,

            take: Number(limit),

            include: {

                visitor: true,

                chatbot: true,

                _count: {

                    select: {

                        messages: true

                    }

                }

            },

            orderBy: {

                id: "desc"

            }

        }),

        prisma.conversation.count({

            where

        })

    ]);

    return {

        data: conversations,

        pagination: {

            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(

                total /

                Number(limit)

            )

        }

    };

}
// ==========================================
// Find By Id + Organization  
// ==========================================

async findByIdWithOrganization(
    id,
    organizationId
) {

    return await prisma.conversation.findFirst({

        where: {

            id: Number(id),

            chatbot: {

                organizationId: Number(
                    organizationId
                )

            }

        },

       include: {

    visitor: true,

    chatbot: true,

    leads: true,

    messages: {

        orderBy: {

            createdAt:"asc"

        }

    }

}

    });

}

// ==========================================
// Conversation Stats
// ==========================================

async getStats(organizationId = null) {

    const where = organizationId
        ? {
              chatbot: {
                  organizationId: Number(organizationId)
              }
          }
        : {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [

        total,

        active,

        closed,

        todayCount

    ] = await Promise.all([

        prisma.conversation.count({

            where

        }),

        prisma.conversation.count({

            where: {

                ...where,

                status: "ACTIVE"

            }

        }),

        prisma.conversation.count({

            where: {

                ...where,

                status: "CLOSED"

            }

        }),

        prisma.conversation.count({

            where: {

                ...where,

                createdAt: {

                    gte: today

                }

            }

        })

    ]);

    return {

        total,

        active,

        closed,

        today: todayCount

    };

}

}

export default new ConversationRepository();
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

    
async findAll() {

    return await prisma.conversation.findMany({

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

    });

}

async findAllByOrganization(
    organizationId
) {

    return await prisma.conversation.findMany({

        where: {

            chatbot: {

                organizationId:
                    Number(organizationId)

            }

        },

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

    });

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
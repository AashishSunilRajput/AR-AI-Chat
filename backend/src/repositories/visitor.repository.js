import prisma from "../config/prisma.js";

class VisitorRepository {

    // ==========================================
    // Create Visitor
    // ==========================================

    async create(data) {

        return await prisma.visitor.create({

            data

        });

    }

    // ==========================================
    // Find By Session Token
    // ==========================================

    async findBySessionToken(sessionToken) {

        return await prisma.visitor.findUnique({

            where: {

                sessionToken

            },

            include: {

                chatbot: true,

                conversations: true

            }

        });

    }

    // ==========================================
    // Find By Id
    // ==========================================

    async findById(id) {

        return await prisma.visitor.findUnique({

            where: {

                id: Number(id)

            },

            include: {

                chatbot: true,

                conversations: true

            }

        });

    }

    // ==========================================
    // Update Last Seen
    // ==========================================

    async updateLastSeen(id) {

        return await prisma.visitor.update({

            where: {

                id: Number(id)

            },

            data: {

                lastSeenAt: new Date()

            }

        });

    }

    // ==========================================
    // Update Visitor
    // ==========================================

    async update(id, data) {

        return await prisma.visitor.update({

            where: {

                id: Number(id)

            },

            data

        });

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.visitor.delete({

            where: {

                id: Number(id)

            }

        });

    }

    // ==========================================
// Get All Visitors
// ==========================================

// ==========================================
// Get All Visitors With Pagination
// ==========================================

async findAll(
    organizationId,
    filters = {}
) {

    const {

        page = 1,

        limit = 10,

        search

    } = filters;


    const where = {};


    if (organizationId) {

        where.organizationId =
            Number(organizationId);

    }


    if (search) {

        where.OR = [

            {
                name:{
                    contains:search,
                    mode:"insensitive"
                }
            },

            {
                email:{
                    contains:search,
                    mode:"insensitive"
                }
            }

        ];

    }


    const skip =
        (Number(page)-1)
        *
        Number(limit);



    const [
        visitors,
        total
    ] = await Promise.all([


        prisma.visitor.findMany({

            where,

            skip,

            take:Number(limit),


            include: {

                chatbot: {

                    select:{
                        id:true,
                        name:true
                    }

                },

                _count: {

                    select: {

                        conversations:true,

                        leads:true

                    }

                }

            },


            orderBy:{

                createdAt:"desc"

            }


        }),



        prisma.visitor.count({

            where

        })


    ]);



    return {

        data: visitors,

        pagination:{


            total,


            page:Number(page),


            limit:Number(limit),


            totalPages:
                Math.ceil(
                    total /
                    Number(limit)
                )

        }

    };

}

// ==========================================
// Visitor Details
// ==========================================

async findDetails(id) {

    return await prisma.visitor.findUnique({

        where: {

            id: Number(id)

        },

        include: {

            chatbot: true,

            conversations: {

                include: {

                    _count: {

                        select: {

                            messages: true

                        }

                    }

                },

                orderBy: {

                    createdAt: "desc"

                }

            },

            leads: {

                orderBy: {

                    createdAt: "desc"

                }

            }

        }

    });

}

// ==========================================
// Visitor Stats
// ==========================================

async getStats(organizationId) {

    const where = organizationId
        ? {
            organizationId: Number(
                organizationId
            )
        }
        : {};

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const [

        total,

        active,

        todayVisitors

    ] = await Promise.all([

        prisma.visitor.count({

            where

        }),

        prisma.visitor.count({

            where: {

                ...where,

                lastSeenAt: {

                    gte: new Date(
                        Date.now() -
                        1000 * 60 * 30
                    )

                }

            }

        }),

        prisma.visitor.count({

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

        today: todayVisitors

    };

}

}

export default new VisitorRepository();
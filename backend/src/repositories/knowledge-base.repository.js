import prisma from "../config/prisma.js";

class KnowledgeBaseRepository {

    // ==========================================
    // Create
    // ==========================================

    async create(data) {

        return await prisma.knowledgeBase.create({
            data
        });

    }

    // ==========================================
    // Find All (SUPER_ADMIN)
    // ==========================================

    async findAll() {

        return await prisma.knowledgeBase.findMany({

            include: {

                chatbot: {

                    select: {

                        id: true,
                        name: true

                    }

                },

                organization: {

                    select: {

                        id: true,
                        name: true

                    }

                },

                _count: {

                    select: {

                        documents: true

                    }

                }

            },

            orderBy: {

                id: "desc"

            }

        });

    }

    // ==========================================
    // Find By Organization (CLIENT_ADMIN)
    // ==========================================

    async findByOrganization(organizationId) {

        return await prisma.knowledgeBase.findMany({

            where: {

                organizationId

            },

            include: {

                chatbot: {

                    select: {

                        id: true,
                        name: true

                    }

                },

                _count: {

                    select: {

                        documents: true

                    }

                }

            },

            orderBy: {

                id: "desc"

            }

        });

    }

    // ==========================================
    // Find By Id
    // ==========================================

    async findById(id, organizationId = null) {

        return await prisma.knowledgeBase.findFirst({

            where: {

                id,

                ...(organizationId && {
                    organizationId
                })

            },

            include: {

                chatbot: {

                    select: {

                        id: true,
                        name: true,
                        widgetKey: true

                    }

                },

                organization: {

                    select: {

                        id: true,
                        name: true

                    }

                },

                documents: {

                    select: {

                        id: true,
                        title: true,
                        processingStatus: true,
                        createdAt: true

                    },

                    orderBy: {

                        id: "desc"

                    }

                },

                _count: {

                    select: {

                        documents: true

                    }

                }

            }

        });

    }

    // ==========================================
    // Find By Name
    // ==========================================

    async findByName(
        organizationId,
        chatbotId,
        name
    ) {

        return await prisma.knowledgeBase.findFirst({

            where: {

                organizationId,

                chatbotId,

                name

            }

        });

    }

    // ==========================================
    // Update
    // ==========================================

    async update(id, data) {

        return await prisma.knowledgeBase.update({

            where: {

                id

            },

            data

        });

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.knowledgeBase.delete({

            where: {

                id

            }

        });

    }

}

export default new KnowledgeBaseRepository();
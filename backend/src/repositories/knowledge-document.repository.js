import prisma from "../config/prisma.js";


class KnowledgeDocumentRepository {


    // ==========================================
    // Create Document
    // ==========================================

    async create(data) {

        return await prisma.knowledgeDocument.create({

            data

        });

    }



    // ==========================================
    // Find All Documents
    // ==========================================

    async findAll(knowledgeBaseId) {

        return await prisma.knowledgeDocument.findMany({

            where: {

                knowledgeBaseId

            },

            orderBy: {

                id: "desc"

            }

        });

    }



    // ==========================================
    // Find By ID
    // ==========================================

    async findById(id) {

        return await prisma.knowledgeDocument.findUnique({

            where: {

                id

            },

            include: {

                knowledgeBase: true,

                chunks: true

            }

        });

    }



    // ==========================================
    // Find By ID + Organization Security
    // ==========================================

    async findByIdWithOrganization(
        id,
        organizationId
    ) {

        return await prisma.knowledgeDocument.findFirst({

            where: {

                id,

                knowledgeBase: {

                    organizationId

                }

            },

            include: {

                knowledgeBase: true

            }

        });

    }



    // ==========================================
    // Update Document
    // ==========================================

    async update(id, data) {

        return await prisma.knowledgeDocument.update({

            where: {

                id

            },

            data

        });

    }



    // ==========================================
    // Update Processing Status
    // ==========================================

    async updateStatus(
        id,
        status
    ) {

        return await prisma.knowledgeDocument.update({

            where: {

                id

            },

            data: {

                processingStatus: status

            }

        });

    }



    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.knowledgeDocument.delete({

            where: {

                id

            }

        });

    }



    // ==========================================
    // Count Documents
    // ==========================================

    async count(knowledgeBaseId) {

        return await prisma.knowledgeDocument.count({

            where: {

                knowledgeBaseId

            }

        });

    }


}


export default new KnowledgeDocumentRepository();
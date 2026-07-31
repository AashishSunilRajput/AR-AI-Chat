import prisma from "../config/prisma.js";

class KnowledgeDocumentRepository {

    // ======================================
    // Create Document
    // ======================================

async create(data) {


    const {
        knowledgeBaseId,
        ...documentData
    } = data;


    return await prisma.knowledgeDocument.create({

        data: {


            ...documentData,


            knowledgeBase: {

                connect: {

                    id: Number(
                        knowledgeBaseId
                    )

                }

            }

        }

    });


}

    // ======================================
    // Get All Documents
    // ======================================

    async findAll(knowledgeBaseId) {

        return await prisma.knowledgeDocument.findMany({

            where: {

                knowledgeBaseId

            },

            include: {

                _count: {

                    select: {

                        chunks: true

                    }

                }

            },

            orderBy: {

                id: "desc"

            }

        });

    }

    // ======================================
    // Find By ID
    // ======================================

    async findById(id) {

        return await prisma.knowledgeDocument.findUnique({

            where: {

                id

            },

            include: {

                knowledgeBase: true,

                chunks: {

                    orderBy: {

                        chunkIndex: "asc"

                    }

                }

            }

        });

    }

    // ======================================
    // Find By ID + Organization
    // ======================================

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

                knowledgeBase: true,

                chunks: {

                    orderBy: {

                        chunkIndex: "asc"

                    }

                }

            }

        });

    }

    // ======================================
    // Update Document
    // ======================================

    async update(id, data) {

        return await prisma.knowledgeDocument.update({

            where: {

                id

            },

            data

        });

    }

    // ======================================
    // Update Status
    // ======================================

    async updateStatus(
        id,
        processingStatus
    ) {

        return await prisma.knowledgeDocument.update({

            where: {

                id

            },

            data: {

                processingStatus

            }

        });

    }

    // ======================================
// Start Processing
// ======================================

async startProcessing(id, totalPages = 0) {

    return await prisma.knowledgeDocument.update({

        where: {
            id: Number(id)
        },

        data: {

            processingStatus: "PROCESSING",

            startedAt: new Date(),

            completedAt: null,

            failedReason: null,

            currentUrl: null,

            processedPages: 0,

            totalPages

        }

    });

}

// ======================================
// Update Progress
// ======================================

async updateProgress(
    id,
    {
        processedPages,
        totalPages,
        currentUrl
    }
) {

    return await prisma.knowledgeDocument.update({

        where: {
            id: Number(id)
        },

        data: {

            processedPages,

            totalPages,

            currentUrl

        }

    });

}

// ======================================
// Finish Processing
// ======================================

async finishProcessing(id) {

    const document =
        await prisma.knowledgeDocument.findUnique({

            where: {
                id: Number(id)
            },

            select: {
                startedAt: true
            }

        });

    const duration =
        document?.startedAt
            ? Math.floor(
                  (Date.now() -
                      document.startedAt.getTime()) /
                      1000
              )
            : null;

    return await prisma.knowledgeDocument.update({

        where: {
            id: Number(id)
        },

        data: {

            processingStatus: "COMPLETED",

            completedAt: new Date(),

            importDuration: duration

        }

    });

}

// ======================================
// Fail Processing
// ======================================

async failProcessing(
    id,
    reason
) {

    return await prisma.knowledgeDocument.update({

        where: {
            id: Number(id)
        },

        data: {

            processingStatus: "FAILED",

            completedAt: new Date(),

            failedReason: reason

        }

    });

}

    // ======================================
    // Count Documents
    // ======================================

    async count(knowledgeBaseId) {

        return await prisma.knowledgeDocument.count({

            where: {

                knowledgeBaseId

            }

        });

    }

    // ==========================================
// Count By Document
// ==========================================

async countByDocument(documentId) {

    return await prisma.knowledgeEmbedding.count({

        where: {

            chunk: {

                documentId: Number(documentId)

            }

        }

    });

}

// ==========================================
// Find By Source URL
// ==========================================

async findBySourceUrl(
    knowledgeBaseId,
    sourceUrl
) {

    return await prisma.knowledgeDocument.findFirst({

        where: {

            knowledgeBaseId: Number(
                knowledgeBaseId
            ),

            sourceUrl

        }

    });

}

    // ======================================
    // Delete Document
    // ======================================

    async delete(id) {

        return await prisma.knowledgeDocument.delete({

            where: {

                id

            }

        });

    }

}

export default new KnowledgeDocumentRepository();
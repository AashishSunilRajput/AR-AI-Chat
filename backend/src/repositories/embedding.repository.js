import prisma from "../config/prisma.js";

class EmbeddingRepository {

    // ==========================================
    // Create
    // ==========================================

    async create(data) {

        return await prisma.knowledgeEmbedding.create({

            data

        });

    }

    // ==========================================
    // Find By Chunk
    // ==========================================

    async findByChunk(chunkId) {

        return await prisma.knowledgeEmbedding.findFirst({

            where: {

                chunkId

            }

        });

    }

    // ==========================================
    // Find By ID
    // ==========================================

    async findById(id) {

        return await prisma.knowledgeEmbedding.findUnique({

            where: {

                id

            }

        });

    }

    // ==========================================
    // Find All By Document
    // ==========================================

    async findByDocument(documentId) {

        return await prisma.knowledgeEmbedding.findMany({

            where: {

                chunk: {

                    document: {

                        id: Number(documentId)

                    }

                }

            },

            include: {

                chunk: true

            },

            orderBy: {

                id: "asc"

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
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.knowledgeEmbedding.delete({

            where: {

                id

            }

        });

    }

    // ==========================================
// Find All By Chatbot
// ==========================================

async findByChatbot(chatbotId) {

    return await prisma.knowledgeEmbedding.findMany({

        where: {

            chunk: {

                document: {

                    knowledgeBase: {

                        chatbotId: Number(chatbotId)

                    }

                }

            }

        },

        include: {

            chunk: {

                include: {

                    document: true

                }

            }

        }

    });

}

}

export default new EmbeddingRepository();
-- CreateEnum
CREATE TYPE "EmbeddingProvider" AS ENUM ('OPENAI', 'GEMINI', 'CLAUDE');

-- CreateTable
CREATE TABLE "KnowledgeEmbedding" (
    "id" SERIAL NOT NULL,
    "chunkId" INTEGER NOT NULL,
    "provider" "EmbeddingProvider" NOT NULL DEFAULT 'OPENAI',
    "model" TEXT NOT NULL,
    "vector" JSONB NOT NULL,
    "tokenCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KnowledgeEmbedding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KnowledgeEmbedding" ADD CONSTRAINT "KnowledgeEmbedding_chunkId_fkey" FOREIGN KEY ("chunkId") REFERENCES "KnowledgeChunk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

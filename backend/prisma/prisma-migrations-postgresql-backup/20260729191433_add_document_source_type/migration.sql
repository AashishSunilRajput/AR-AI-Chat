-- CreateEnum
CREATE TYPE "DocumentSourceType" AS ENUM ('WEBSITE', 'PDF', 'TEXT', 'FAQ');

-- AlterTable
ALTER TABLE "KnowledgeDocument" ADD COLUMN     "sourceType" "DocumentSourceType" NOT NULL DEFAULT 'WEBSITE',
ADD COLUMN     "sourceUrl" TEXT;

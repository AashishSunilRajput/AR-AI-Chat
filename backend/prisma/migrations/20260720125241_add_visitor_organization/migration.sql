/*
  Warnings:

  - You are about to drop the column `phone` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Visitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Visitor_sessionId_key";

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "phone",
DROP COLUMN "sessionId",
ADD COLUMN     "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sessionToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_sessionToken_key" ON "Visitor"("sessionToken");

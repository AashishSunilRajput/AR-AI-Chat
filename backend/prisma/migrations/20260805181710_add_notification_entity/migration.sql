/*
  Warnings:

  - The `entityType` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "NotificationEntityType" AS ENUM ('LEAD', 'CONVERSATION', 'VISITOR', 'CHATBOT', 'KNOWLEDGE_DOCUMENT', 'USER', 'ORGANIZATION');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "entityType",
ADD COLUMN     "entityType" "NotificationEntityType";

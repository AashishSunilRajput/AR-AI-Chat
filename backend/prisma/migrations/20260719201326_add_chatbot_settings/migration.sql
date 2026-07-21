/*
  Warnings:

  - The `allowedDomains` column on the `ChatbotSetting` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ChatbotSetting" DROP COLUMN "allowedDomains",
ADD COLUMN     "allowedDomains" JSONB;

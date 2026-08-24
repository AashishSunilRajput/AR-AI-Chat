/*
  Warnings:

  - You are about to drop the column `widgetKey` on the `ChatbotSetting` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ChatbotSetting_widgetKey_key";

-- AlterTable
ALTER TABLE "ChatbotSetting" DROP COLUMN "widgetKey";

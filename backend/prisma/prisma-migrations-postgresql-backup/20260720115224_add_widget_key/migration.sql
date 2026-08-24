/*
  Warnings:

  - A unique constraint covering the columns `[widgetKey]` on the table `Chatbot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chatbot" ADD COLUMN     "allowedDomains" JSONB,
ADD COLUMN     "widgetKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Chatbot_widgetKey_key" ON "Chatbot"("widgetKey");

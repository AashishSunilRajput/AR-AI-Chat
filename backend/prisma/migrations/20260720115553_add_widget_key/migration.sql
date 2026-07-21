/*
  Warnings:

  - Made the column `widgetKey` on table `Chatbot` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chatbot" ALTER COLUMN "widgetKey" SET NOT NULL;

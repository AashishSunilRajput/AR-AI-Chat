-- CreateEnum
CREATE TYPE "WidgetTheme" AS ENUM ('LIGHT', 'DARK', 'AUTO');

-- CreateEnum
CREATE TYPE "WidgetPosition" AS ENUM ('BOTTOM_RIGHT', 'BOTTOM_LEFT');

-- CreateTable
CREATE TABLE "ChatbotSetting" (
    "id" SERIAL NOT NULL,
    "chatbotId" INTEGER NOT NULL,
    "aiProvider" "AIProvider" NOT NULL DEFAULT 'OPENAI',
    "model" TEXT NOT NULL DEFAULT 'gpt-5-mini',
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.7,
    "maxTokens" INTEGER NOT NULL DEFAULT 1000,
    "systemPrompt" TEXT,
    "welcomeMessage" TEXT DEFAULT 'Hi 👋 How can I help you today?',
    "primaryColor" TEXT NOT NULL DEFAULT '#2563EB',
    "avatar" TEXT,
    "theme" "WidgetTheme" NOT NULL DEFAULT 'LIGHT',
    "position" "WidgetPosition" NOT NULL DEFAULT 'BOTTOM_RIGHT',
    "widgetKey" TEXT NOT NULL,
    "allowedDomains" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatbotSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatbotSetting_chatbotId_key" ON "ChatbotSetting"("chatbotId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatbotSetting_widgetKey_key" ON "ChatbotSetting"("widgetKey");

-- AddForeignKey
ALTER TABLE "ChatbotSetting" ADD CONSTRAINT "ChatbotSetting_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `chatbotsetting` MODIFY `welcomeMessage` VARCHAR(191) NULL DEFAULT 'Hi 👋 How can I help you today?';

-- AlterTable
ALTER TABLE `whatsappaccount` ADD COLUMN `chatbotId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `WhatsAppAccount_chatbotId_idx` ON `WhatsAppAccount`(`chatbotId`);

-- AddForeignKey
ALTER TABLE `WhatsAppAccount` ADD CONSTRAINT `WhatsAppAccount_chatbotId_fkey` FOREIGN KEY (`chatbotId`) REFERENCES `Chatbot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

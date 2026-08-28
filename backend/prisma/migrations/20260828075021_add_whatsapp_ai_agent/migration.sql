-- AlterTable
ALTER TABLE `chatbotsetting` MODIFY `welcomeMessage` VARCHAR(191) NULL DEFAULT 'Hi 👋 How can I help you today?';

-- CreateTable
CREATE TABLE `WhatsAppAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NOT NULL,
    `businessAccountId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'CONNECTED', 'DISCONNECTED', 'ERROR') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `WhatsAppAccount_organizationId_idx`(`organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhatsAppPhoneNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `whatsappAccountId` INTEGER NOT NULL,
    `phoneNumberId` VARCHAR(191) NOT NULL,
    `displayPhoneNumber` VARCHAR(191) NOT NULL,
    `verifiedName` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'CONNECTED', 'DISCONNECTED', 'ERROR') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WhatsAppPhoneNumber_phoneNumberId_key`(`phoneNumberId`),
    INDEX `WhatsAppPhoneNumber_whatsappAccountId_idx`(`whatsappAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhatsAppContact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumberId` INTEGER NOT NULL,
    `waId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `profileName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WhatsAppContact_waId_key`(`waId`),
    INDEX `WhatsAppContact_phoneNumberId_idx`(`phoneNumberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhatsAppConversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumberId` INTEGER NOT NULL,
    `contactId` INTEGER NOT NULL,
    `status` ENUM('ACTIVE', 'CLOSED') NOT NULL DEFAULT 'ACTIVE',
    `agentMode` ENUM('AI', 'HUMAN') NOT NULL DEFAULT 'AI',
    `lastMessageAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `WhatsAppConversation_phoneNumberId_idx`(`phoneNumberId`),
    INDEX `WhatsAppConversation_contactId_idx`(`contactId`),
    INDEX `WhatsAppConversation_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhatsAppMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversationId` INTEGER NOT NULL,
    `whatsappMessageId` VARCHAR(191) NULL,
    `direction` ENUM('INBOUND', 'OUTBOUND') NOT NULL,
    `status` ENUM('RECEIVED', 'SENT', 'DELIVERED', 'READ', 'FAILED') NOT NULL DEFAULT 'RECEIVED',
    `messageType` VARCHAR(191) NOT NULL DEFAULT 'text',
    `message` TEXT NOT NULL,
    `errorMessage` TEXT NULL,
    `sentAt` DATETIME(3) NULL,
    `deliveredAt` DATETIME(3) NULL,
    `readAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `WhatsAppMessage_whatsappMessageId_key`(`whatsappMessageId`),
    INDEX `WhatsAppMessage_conversationId_idx`(`conversationId`),
    INDEX `WhatsAppMessage_direction_idx`(`direction`),
    INDEX `WhatsAppMessage_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhatsAppWebhookEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `whatsappAccountId` INTEGER NOT NULL,
    `eventId` VARCHAR(191) NULL,
    `payload` JSON NOT NULL,
    `status` ENUM('PENDING', 'PROCESSED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `errorMessage` TEXT NULL,
    `processedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `WhatsAppWebhookEvent_eventId_key`(`eventId`),
    INDEX `WhatsAppWebhookEvent_whatsappAccountId_idx`(`whatsappAccountId`),
    INDEX `WhatsAppWebhookEvent_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WhatsAppAccount` ADD CONSTRAINT `WhatsAppAccount_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WhatsAppPhoneNumber` ADD CONSTRAINT `WhatsAppPhoneNumber_whatsappAccountId_fkey` FOREIGN KEY (`whatsappAccountId`) REFERENCES `WhatsAppAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WhatsAppContact` ADD CONSTRAINT `WhatsAppContact_phoneNumberId_fkey` FOREIGN KEY (`phoneNumberId`) REFERENCES `WhatsAppPhoneNumber`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WhatsAppConversation` ADD CONSTRAINT `WhatsAppConversation_phoneNumberId_fkey` FOREIGN KEY (`phoneNumberId`) REFERENCES `WhatsAppPhoneNumber`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WhatsAppConversation` ADD CONSTRAINT `WhatsAppConversation_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `WhatsAppContact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WhatsAppMessage` ADD CONSTRAINT `WhatsAppMessage_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `WhatsAppConversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WhatsAppWebhookEvent` ADD CONSTRAINT `WhatsAppWebhookEvent_whatsappAccountId_fkey` FOREIGN KEY (`whatsappAccountId`) REFERENCES `WhatsAppAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

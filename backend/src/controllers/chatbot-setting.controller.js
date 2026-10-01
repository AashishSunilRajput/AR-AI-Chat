import chatbotSettingService from "../services/chatbot-setting.service.js";
import fs from "fs/promises";
import remoteStorage from "../storage/remote.storage.js";
import { getStorageUrl } from "../utils/storage-url.js";

class ChatbotSettingController {

    async getSettings(req, res, next) {

        try {

            const data =
                await chatbotSettingService.getSettings(

                    req.params.chatbotId,

                    req.user

                );

            return res.status(200).json({

                success: true,

                data

            });

        } catch (error) {

            next(error);

        }

    }

    async updateSettings(req, res, next) {

        try {

            const data =
                await chatbotSettingService.updateSettings(

                    req.params.chatbotId,

                    req.user,

                    req.body

                );

            return res.status(200).json({

                success: true,

                message: "Settings updated successfully",

                data

            });

        } catch (error) {

            next(error);

        }

    }

    // ==========================================
// Upload Avatar
// ==========================================

async uploadAvatar(req, res, next) {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Avatar is required"

            });

        }

    const result =
    await remoteStorage.upload(
        req.file.path,
        "images"
    );

const avatar =
    `/uploads/images/${result.filename}`;

const data =
    await chatbotSettingService.updateAvatar(
        req.params.chatbotId,
        req.user,
        avatar
    );

data.avatar =
    getStorageUrl(data.avatar);

await fs.unlink(req.file.path);

        return res.status(200).json({

            success: true,

            message: "Avatar uploaded successfully",

            data

        });

    }
    catch (error) {

        next(error);

    }

}

}

export default new ChatbotSettingController();
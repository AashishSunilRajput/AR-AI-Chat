"use client";

import { useEffect, useState } from "react";

import settingService, {
    SettingsData,
} from "@/services/setting.service";

import OrganizationSettings from "@/components/settings/OrganizationSettings";
import ChatbotSettings from "@/components/settings/ChatbotSettings";
import WidgetInfo from "@/components/settings/WidgetInfo";
import ChangePassword from "@/components/settings/ChangePassword";

export default function SettingsPage() {

    const [settings, setSettings] =
        useState<SettingsData>();

    const [loading, setLoading] =
        useState(true);

    const loadData = async () => {

        try {

            const response =
                await settingService.getSettings();

            setSettings(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    if (loading) {

        return (

            <div className="p-6">

                Loading...

            </div>

        );

    }

    if (!settings) {

        return (

            <div className="p-6">

                No settings found.

            </div>

        );

    }

    return (

        <div className="space-y-8 p-6">

            {/* ========================================== */}
            {/* Header */}
            {/* ========================================== */}

            <div>

                <h1 className="text-3xl font-bold">

                    Settings

                </h1>

                <p className="text-slate-500">

                    Manage your organization and chatbot settings.

                </p>

            </div>

            {/* ========================================== */}
            {/* Organization */}
            {/* ========================================== */}

            <OrganizationSettings
                organization={settings}
                onUpdated={loadData}
            />

            {/* ========================================== */}
            {/* Chatbots */}
            {/* ========================================== */}

            {settings.chatbots.map((chatbot) => (

                <div
                    key={chatbot.id}
                    className="space-y-6"
                >

                    <ChatbotSettings
                        chatbot={chatbot}
                        onUpdated={loadData}
                    />

                    <WidgetInfo
                        chatbot={chatbot}
                    />

                </div>

            ))}

            {/* ========================================== */}
            {/* Password */}
            {/* ========================================== */}

            <ChangePassword />

        </div>

    );

}
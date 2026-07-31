"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AISettingsCard from "@/components/chatbot-settings/AISettingsCard";
import WidgetSettingsCard from "@/components/chatbot-settings/WidgetSettingsCard";
import SecuritySettingsCard from "@/components/chatbot-settings/SecuritySettingsCard";
import AdvancedSettingsCard from "@/components/chatbot-settings/AdvancedSettingsCard";

import chatbotSettingService, {
    ChatbotSetting
} from "@/services/chatbot-setting.service";

export default function ChatbotSettingsPage() {

    const params = useParams();

    const chatbotId = Number(params.id);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] =
        useState<ChatbotSetting | null>(null);

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const response =
                await chatbotSettingService.getSettings(
                    chatbotId
                );

            setForm(response.data);

        }
        catch (err: any) {

            setError(
                err.response?.data?.message ||
                "Unable to load settings"
            );

        }
        finally {

            setLoading(false);

        }

    };

    const handleChange = (

        e: React.ChangeEvent<

            HTMLInputElement |

            HTMLSelectElement |

            HTMLTextAreaElement

        >

    ) => {

        if (!form) return;

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const saveSettings = async () => {

        if (!form) return;

        try {

            setSaving(true);

            await chatbotSettingService.updateSettings(

                chatbotId,

                form

            );

            alert("Settings updated successfully");

        }
        catch (err: any) {

            alert(

                err.response?.data?.message ||

                "Update failed"

            );

        }
        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="p-10">

                Loading...

            </div>

        );

    }

    if (error) {

        return (

            <div className="rounded-xl bg-red-100 p-5 text-red-700">

                {error}

            </div>

        );

    }

    if (!form) {

        return null;

    }

 return (

    <div className="space-y-6">

        <div>

            <h1 className="text-3xl font-bold">

                Chatbot Settings

            </h1>

            <p className="mt-2 text-slate-500">

                Configure AI Settings

            </p>

        </div>

        <AISettingsCard
            form={form}
            onChange={handleChange}
        />
        <WidgetSettingsCard

    form={form}

    onChange={handleChange}

/>
<SecuritySettingsCard

    form={form}

    setForm={setForm}

    onChange={handleChange}

/>
<AdvancedSettingsCard

    form={form}

    onChange={handleChange}

/>
        <div className="flex justify-end">

            <button

                onClick={saveSettings}

                disabled={saving}

                className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"

            >

                {saving ? "Saving..." : "Save Changes"}

            </button>

        </div>

    </div>

);

}
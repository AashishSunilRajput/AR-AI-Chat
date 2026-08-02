"use client";

import { useState } from "react";
import settingService from "@/services/setting.service";
import organizationService from "@/services/organization.service";
import { toast } from "sonner";

interface Props {
    organization: any;
    onUpdated?: () => void;
}

export default function OrganizationSettings({
    organization,
    onUpdated,
}: Props) {

    const [loading, setLoading] = useState(false);

    const [logoLoading, setLogoLoading] = useState(false);

const [logoPreview, setLogoPreview] = useState(
    organization.logo || ""
);

    const [form, setForm] = useState({

        phone: organization.phone || "",

        website: organization.website || "",

        companyAddress:
            organization.settings?.companyAddress || "",

        companyCity:
            organization.settings?.companyCity || "",

        companyState:
            organization.settings?.companyState || "",

        companyCountry:
            organization.settings?.companyCountry || "",

        timezone:
            organization.settings?.timezone || "Asia/Kolkata",

        language:
            organization.settings?.language || "en",

    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
) => {


    const file = e.target.files?.[0];


    if(!file){
        return;
    }


    try {

        setLogoLoading(true);


        const response =
            await organizationService.uploadLogo(
                organization.id,
                file
            );


        setLogoPreview(
            response.data.logo
        );


        toast.success(
            "Logo uploaded successfully"
        );


        onUpdated?.();


    }
    catch(error){

        console.error(error);

        toast.error(
            "Logo upload failed"
        );

    }
    finally{

        setLogoLoading(false);

    }

};
    const handleSave = async () => {

        try {

            setLoading(true);

            await settingService.updateOrganizationSettings(form);

    toast.success(
    "Organization settings updated successfully"
);

            onUpdated?.();

        }

        catch (error) {

            console.error(error);

    toast.error(
    "Organization settings update failed"
);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-6 text-xl font-semibold">

                Organization Settings

            </h2>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">

    <label className="mb-2 block text-sm font-medium">
        Organization Logo
    </label>


    <div className="flex items-center gap-5">


        {logoPreview ? (

           <img
    src={
        logoPreview.startsWith("http")
        ? logoPreview
        : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${logoPreview}`
    }
    alt="Organization Logo"
    className="h-20 w-20 rounded-xl border object-cover"
/>

        ) : (

            <div className="flex h-20 w-20 items-center justify-center rounded-xl border bg-slate-100">
                No Logo
            </div>

        )}



        <div>

            <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="block text-sm"
            />


            {logoLoading && (

                <p className="mt-2 text-sm text-slate-500">
                    Uploading...
                </p>

            )}

        </div>


    </div>


</div>

                {/* View Only */}

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Organization Name

                    </label>

                    <input
                        value={organization.name}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Email

                    </label>

                    <input
                        value={organization.email}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Plan

                    </label>

                    <input
                        value={organization.plan}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Status

                    </label>

                    <input
                        value={organization.status}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                {/* Editable */}

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Phone

                    </label>

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Website

                    </label>

                    <input
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div className="md:col-span-2">

                    <label className="mb-1 block text-sm font-medium">

                        Address

                    </label>

                    <input
                        name="companyAddress"
                        value={form.companyAddress}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        City

                    </label>

                    <input
                        name="companyCity"
                        value={form.companyCity}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        State

                    </label>

                    <input
                        name="companyState"
                        value={form.companyState}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Country

                    </label>

                    <input
                        name="companyCountry"
                        value={form.companyCountry}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Timezone

                    </label>

                    <select
                        name="timezone"
                        value={form.timezone}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    >

                        <option value="Asia/Kolkata">
                            Asia/Kolkata
                        </option>

                        <option value="UTC">
                            UTC
                        </option>

                    </select>

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Language

                    </label>

                    <select
                        name="language"
                        value={form.language}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    >

                        <option value="en">
                            English
                        </option>

                    </select>

                </div>

            </div>

            <div className="mt-6 flex justify-end">

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >

                    {loading
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </div>

        </div>

    );

}
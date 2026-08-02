"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import organizationService from "@/services/organization.service";

interface Props {
    organization: any;
}

export default function EditOrganizationForm({
    organization,
}: Props) {

  const [preview, setPreview] = useState(

    organization.logo

        ? `${process.env.NEXT_PUBLIC_API_URL?.replace(
            "/api",
            ""
        )}${organization.logo}`

        : null

);

const handleLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    try {

        setUploadingLogo(true);

        console.log("Uploading Organization ID:", organization.id);

       
           const response =
   await organizationService.uploadLogo(
    organization.id,
    file
);

        console.log("UPLOAD SUCCESS:", response);

        setPreview(
            `${process.env.NEXT_PUBLIC_API_URL?.replace(
                "/api",
                ""
            )}${response.data.logo}`
        );

        toast.success(
            "Organization logo updated successfully."
        );

    }

    catch (error: any) {

        console.log("FULL ERROR:", error);

        console.log("STATUS:", error.response?.status);

        console.log("DATA:", error.response?.data);

        toast.error(
            error.response?.data?.message ||
            "Unable to upload logo."
        );

    }

    finally {

        setUploadingLogo(false);

    }

};

const [uploadingLogo, setUploadingLogo] =
    useState(false);

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({

            name:
                organization.name || "",

            email:
                organization.email || "",

            phone:
                organization.phone || "",

            website:
                organization.website || "",

            plan:
                organization.plan || "FREE",

            status:
                organization.status || "ACTIVE",

            companyAddress:
                organization.settings?.companyAddress || "",

            companyCity:
                organization.settings?.companyCity || "",

            companyState:
                organization.settings?.companyState || "",

            companyCountry:
                organization.settings?.companyCountry || "",

            timezone:
                organization.settings?.timezone ||
                "Asia/Kolkata",

            language:
                organization.settings?.language ||
                "en"

        });

    const handleChange = (

        e: React.ChangeEvent<

            HTMLInputElement |

            HTMLSelectElement |

            HTMLTextAreaElement

        >

    ) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });

    };

    const handleSave = async () => {

        try {

            setLoading(true);

            await organizationService.update(

                organization.id,

                form

            );

            toast.success(
                "Organization updated successfully."
            );

            router.push(
                `/organizations/${organization.id}`
            );

        }

        catch (error: any) {

            toast.error(

                error.response?.data?.message ||

                "Unable to update organization."

            );

        }

        finally {

            setLoading(false);

        }

    };

 

    return (
        <div className="space-y-6">            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Edit Organization

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Update organization information and settings.

                    </p>

                </div>

            </div>



            {/* Organization Information */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-semibold">

                    Organization Information

                </h2>

                <div className="flex items-center gap-6">

    {

        preview ?

        (

            <img

                src={preview}

                alt="Organization Logo"

                className="
                h-24
                w-24
                rounded-xl
                border
                object-cover
                "

            />

        )

        :

        (

            <div
                className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-xl
                bg-slate-200
                text-3xl
                font-bold
                "
            >

                {organization.name.charAt(0)}

            </div>

        )

    }

    <div>

        <label
            className="
            cursor-pointer
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-white
            hover:bg-blue-700
            "
        >

            {

                uploadingLogo

                ?

                "Uploading..."

                :

                "Change Logo"

            }

            <input

                type="file"

                accept="image/*"

                hidden

                onChange={handleLogoChange}

            />

        </label>

    </div>

</div>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Organization Name

                        </label>

                        <input

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                            className="w-full rounded-lg border px-3 py-2"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Email

                        </label>

                        <input

                            name="email"

                            value={form.email}

                            onChange={handleChange}

                            className="w-full rounded-lg border px-3 py-2"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

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

                        <label className="mb-2 block text-sm font-medium">

                            Website

                        </label>

                        <input

                            name="website"

                            value={form.website}

                            onChange={handleChange}

                            className="w-full rounded-lg border px-3 py-2"

                        />

                    </div>

                </div>

            </div>



            {/* Subscription */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-semibold">

                    Subscription

                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Plan

                        </label>

                        <select

                            name="plan"

                            value={form.plan}

                            onChange={handleChange}

                            className="w-full rounded-lg border px-3 py-2"

                        >

                            <option value="FREE">

                                FREE

                            </option>

                            <option value="STARTER">

                                STARTER

                            </option>

                            <option value="PRO">

                                PRO

                            </option>

                            <option value="ENTERPRISE">

                                ENTERPRISE

                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Status

                        </label>

                        <select

                            name="status"

                            value={form.status}

                            onChange={handleChange}

                            className="w-full rounded-lg border px-3 py-2"

                        >

                            <option value="ACTIVE">

                                ACTIVE

                            </option>

                            <option value="INACTIVE">

                                INACTIVE

                            </option>

                        </select>

                    </div>

                </div>

            </div>



            {/* Company Settings */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-semibold">

                    Company Settings

                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium">

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

                        <label className="mb-2 block text-sm font-medium">

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

                        <label className="mb-2 block text-sm font-medium">

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

                        <label className="mb-2 block text-sm font-medium">

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

                        <label className="mb-2 block text-sm font-medium">

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

                        <label className="mb-2 block text-sm font-medium">

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

            </div>
                        {/* Actions */}

            <div className="flex items-center justify-end gap-3">

                <button

                    type="button"

                    onClick={() => router.back()}

                    className="
                    rounded-xl
                    border
                    px-6
                    py-3
                    hover:bg-slate-50
                    "

                >

                    Cancel

                </button>

                <button

                    type="button"

                    onClick={handleSave}

                    disabled={loading}

                    className="
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3
                    text-white
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    "

                >

                    {

                        loading

                        ?

                        "Saving..."

                        :

                        "Save Changes"

                    }

                </button>

            </div>

        </div>

    );

}
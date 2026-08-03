"use client";

import { useState } from "react";
import { toast } from "sonner";

import chatbotSettingService from "@/services/chatbot-setting.service";

interface Props {

    chatbotId: number;

    avatar: string | null;

    onUploaded?: () => void;

}


export default function AvatarSettingsCard({

    chatbotId,

    avatar,

    onUploaded,

}: Props) {


    const [preview, setPreview] =
        useState<string | null>(

            avatar
                ? `${process.env.NEXT_PUBLIC_API_URL?.replace(
                    "/api",
                    ""
                )}${avatar}`
                : null

        );


    const [uploading, setUploading] =
        useState(false);



    const handleAvatarChange = async (

        e: React.ChangeEvent<HTMLInputElement>

    ) => {


        const file =
            e.target.files?.[0];


        if (!file) return;



        const previewUrl =
            URL.createObjectURL(file);



        setPreview(previewUrl);



        try {


            setUploading(true);



            const response =
                await chatbotSettingService.uploadAvatar(

                    chatbotId,

                    file

                );



            toast.success(

                "Avatar uploaded successfully"

            );



            setPreview(

                `${process.env.NEXT_PUBLIC_API_URL?.replace(
                    "/api",
                    ""
                )}${response.data.avatar}`

            );



            onUploaded?.();



        }

        catch (error: any) {


            console.error(error);


            toast.error(

                error.response?.data?.message ||

                "Avatar upload failed"

            );


        }

        finally {


            setUploading(false);


        }


    };



    return (

        <div className="mb-6 rounded-xl border bg-slate-50 p-5">


            <h3 className="mb-4 text-lg font-semibold">

                Chatbot Avatar

            </h3>



            <div className="flex items-center gap-5">


                {
                    preview

                    ?

                    <img

                        src={preview}

                        alt="Chatbot Avatar"

                        className="
                            h-24
                            w-24
                            rounded-full
                            border
                            object-cover
                        "

                    />

                    :

                    <div

                        className="
                            flex
                            h-24
                            w-24
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-200
                            text-4xl
                        "

                    >

                        🤖

                    </div>

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
                            uploading

                            ?

                            "Uploading..."

                            :

                            "Change Avatar"
                        }



                        <input

                            type="file"

                            accept="image/*"

                            hidden

                            onChange={
                                handleAvatarChange
                            }

                        />


                    </label>


                    <p className="mt-2 text-sm text-slate-500">

                        JPG, PNG supported

                    </p>


                </div>



            </div>



        </div>

    );

}
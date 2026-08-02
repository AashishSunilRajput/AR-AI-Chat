"use client";

import { useState } from "react";

import { toast } from "sonner";

import api from "@/lib/axios";


export default function ChangePassword() {


    const [loading, setLoading] =
        useState(false);


    const [form, setForm] =
        useState({

            currentPassword: "",

            newPassword: "",

            confirmPassword: ""

        });



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {


        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });


    };



    const handleSubmit = async (
        e: React.FormEvent
    ) => {


        e.preventDefault();



        if(
            !form.currentPassword ||
            !form.newPassword ||
            !form.confirmPassword
        ){

            toast.error(
                "All fields are required"
            );

            return;

        }



        if(
            form.newPassword !==
            form.confirmPassword
        ){

            toast.error(
                "New password and confirm password do not match"
            );

            return;

        }



        if(
            form.newPassword.length < 6
        ){

            toast.error(
                "Password must be at least 6 characters"
            );

            return;

        }



        try {


            setLoading(true);



            await api.put(
                "/users/change-password",
                {

                    currentPassword:
                        form.currentPassword,


                    newPassword:
                        form.newPassword

                }
            );



            toast.success(
                "Password updated successfully"
            );



            setForm({

                currentPassword:"",

                newPassword:"",

                confirmPassword:""

            });



        }
        catch(error:any){


            toast.error(

                error?.response?.data?.message
                ||
                "Something went wrong"

            );


        }
        finally{


            setLoading(false);


        }


    };



    return (

        <div className="
            rounded-xl
            border
            bg-white
            p-6
        ">


            <h2 className="
                mb-6
                text-xl
                font-semibold
            ">

                Change Password

            </h2>



            <form
                onSubmit={handleSubmit}
                className="
                    space-y-5
                    max-w-xl
                "
            >


                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-medium
                    ">

                        Current Password

                    </label>


                    <input

                        type="password"

                        name="currentPassword"

                        value={
                            form.currentPassword
                        }

                        onChange={handleChange}

                        className="
                            w-full
                            rounded-lg
                            border
                            px-4
                            py-2
                        "

                        placeholder="Enter current password"

                    />

                </div>




                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-medium
                    ">

                        New Password

                    </label>


                    <input

                        type="password"

                        name="newPassword"

                        value={
                            form.newPassword
                        }

                        onChange={handleChange}

                        className="
                            w-full
                            rounded-lg
                            border
                            px-4
                            py-2
                        "

                        placeholder="Enter new password"

                    />

                </div>




                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-medium
                    ">

                        Confirm Password

                    </label>


                    <input

                        type="password"

                        name="confirmPassword"

                        value={
                            form.confirmPassword
                        }

                        onChange={handleChange}

                        className="
                            w-full
                            rounded-lg
                            border
                            px-4
                            py-2
                        "

                        placeholder="Confirm new password"

                    />

                </div>




                <button

                    disabled={loading}

                    type="submit"

                    className="
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-2
                        text-white
                        hover:bg-blue-700
                        disabled:opacity-50
                    "

                >

                    {
                        loading
                        ?
                        "Updating..."
                        :
                        "Update Password"
                    }


                </button>



            </form>



        </div>

    );

}
"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/auth/RoleGuard";

import organizationService from "@/services/organization.service";



export default function CreateOrganizationPage() {


    const router = useRouter();



    const [loading,setLoading] =
        useState(false);



    const [error,setError] =
        useState("");



    const [form,setForm] = useState({

        name:"",

        email:"",

        phone:"",

        website:"",

        plan:"FREE",

        adminName:"",

        adminEmail:"",

        password:""

    });





    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {


        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });


    };







    const submit = async(
        e: React.FormEvent
    )=>{


        e.preventDefault();


        try {


            setLoading(true);

            setError("");



            await organizationService.create(
                form
            );



            router.push(
                "/organizations"
            );



        }
        catch(err:any){


            console.error(err);


            setError(

                err.response?.data?.message ||
                "Organization create failed"

            );


        }
        finally{


            setLoading(false);


        }


    };






    return (

        <RoleGuard
        allowedRoles={[
            "SUPER_ADMIN"
        ]}
    >

        <div className="max-w-3xl space-y-6">





            <div>

                <h1 className="text-3xl font-bold">

                    Add Organization

                </h1>


                <p className="mt-2 text-slate-500">

                    Create new client organization

                </p>


            </div>






            {
                error && (

                    <div className="
                        rounded-xl
                        bg-red-100
                        p-4
                        text-red-700
                    ">

                        {error}

                    </div>

                )
            }







            <form

                onSubmit={submit}

                className="
                    space-y-6
                    rounded-2xl
                    border
                    bg-white
                    p-6
                    shadow-sm
                "

            >





                <h2 className="text-xl font-semibold">

                    Organization Details

                </h2>





                <input

                    name="name"

                    placeholder="Organization Name"

                    value={form.name}

                    onChange={handleChange}

                    className="input"

                    required

                />




                <input

                    name="email"

                    placeholder="Organization Email"

                    type="email"

                    value={form.email}

                    onChange={handleChange}

                    className="input"

                    required

                />





                <input

                    name="phone"

                    placeholder="Phone"

                    value={form.phone}

                    onChange={handleChange}

                    className="input"

                />





                <input

                    name="website"

                    placeholder="Website"

                    value={form.website}

                    onChange={handleChange}

                    className="input"

                />







                <select

                    name="plan"

                    value={form.plan}

                    onChange={handleChange}

                    className="input"

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








                <hr />







                <h2 className="text-xl font-semibold">

                    Client Admin Details

                </h2>







                <input

                    name="adminName"

                    placeholder="Admin Name"

                    value={form.adminName}

                    onChange={handleChange}

                    className="input"

                    required

                />






                <input

                    name="adminEmail"

                    placeholder="Admin Email"

                    type="email"

                    value={form.adminEmail}

                    onChange={handleChange}

                    className="input"

                    required

                />






                <input

                    name="password"

                    placeholder="Password"

                    type="password"

                    value={form.password}

                    onChange={handleChange}

                    className="input"

                    required

                />








                <button


                    disabled={loading}


                    className="
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-2
                        text-white
                        hover:bg-blue-700
                        disabled:opacity-50
                    "


                >


                    {
                        loading
                        ?
                        "Creating..."
                        :
                        "Create Organization"
                    }


                </button>





            </form>





        </div>
 </RoleGuard>

    );

}
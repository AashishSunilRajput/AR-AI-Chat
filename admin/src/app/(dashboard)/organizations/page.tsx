"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import RoleGuard from "@/components/auth/RoleGuard";

import organizationService, {
    Organization
} from "@/services/organization.service";



export default function OrganizationsPage() {


    const router = useRouter();



    const [organizations,setOrganizations] =
        useState<Organization[]>([]);



    const [loading,setLoading] =
        useState(true);




    useEffect(()=>{

        loadOrganizations();

    },[]);




    const loadOrganizations = async()=>{


        try {


            const response =
                await organizationService.getOrganizations();



            setOrganizations(
                response.data
            );


        }
        catch(error){

            console.error(
                "Organization fetch error:",
                error
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


            {

            loading ? (

                <div className="p-10">

                    Loading Organizations...

                </div>


            ) : (


            <div className="space-y-6">



                <div className="flex items-center justify-between">


                    <div>

                        <h1 className="text-3xl font-bold">

                            Organizations

                        </h1>


                        <p className="mt-2 text-slate-500">

                            Manage all client organizations

                        </p>


                    </div>




                    <button

                        onClick={() =>
                            router.push(
                                "/organizations/create"
                            )
                        }

                        className="
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-2
                            text-white
                            hover:bg-blue-700
                        "

                    >

                        + Add Organization


                    </button>


                </div>




                <div className="
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-sm
                ">


                    <table className="w-full">


                        <thead className="bg-slate-50 border-b">


                            <tr>

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Plan
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Users
                                </th>

                                <th className="p-4 text-left">
                                    Chatbots
                                </th>

                            </tr>


                        </thead>



                        <tbody>


                        {
                            organizations.map((org)=>(

                                <tr
                                    key={org.id}
                                    className="
                                        border-b
                                        hover:bg-slate-50
                                    "
                                >


                                    <td className="p-4 font-medium">

                                        {org.name}

                                    </td>


                                    <td className="p-4">

                                        {org.email}

                                    </td>


                                    <td className="p-4">

                                        {org.plan}

                                    </td>


                                    <td className="p-4">

                                        {org.status}

                                    </td>


                                    <td className="p-4">

                                        {org.users}

                                    </td>


                                    <td className="p-4">

                                        {org.chatbots}

                                    </td>


                                </tr>

                            ))
                        }


                        </tbody>


                    </table>


                </div>


            </div>

            )

            }


        </RoleGuard>


    );

}
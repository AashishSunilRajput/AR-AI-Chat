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

         console.log(
            "Organizations:",
            response.data
        );

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



    const getLogo = (logo?:string)=>{


        if(!logo){
            return null;
        }


        return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api","")}${logo}`;


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


        )

        :

        (

        <div className="space-y-6 p-6">



            {/* Header */}

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

                    onClick={()=> 
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





            {/* Table */}


            <div
                className="
                overflow-hidden
                rounded-2xl
                border
                bg-white
                shadow-sm
                "
            >


            <table className="w-full">


            <thead className="border-b bg-slate-50">


            <tr>


                <th className="p-4 text-left">
                    Logo
                </th>


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


                <th className="p-4 text-left">
                    Created
                </th>


                <th className="p-4 text-left">
                    Actions
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



                {/* Logo */}

                <td className="p-4">


                {

                org.logo ?

                (

                <img

                    src={getLogo(org.logo) || ""}

                    alt={org.name}

                    className="
                    h-10
                    w-10
                    rounded-full
                    object-cover
                    "

                />

                )

                :

                (

                <div

                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-200
                    font-semibold
                    "

                >

                    {org.name.charAt(0)}

                </div>

                )

                }


                </td>






                {/* Name */}

                <td className="p-4 font-medium">

                    {org.name}

                </td>





                {/* Email */}

                <td className="p-4">

                    {org.email}

                </td>






                {/* Plan */}

                <td className="p-4">

                    {org.plan}

                </td>






                {/* Status */}

                <td className="p-4">

                    <span
                    className="
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-sm
                    text-green-700
                    "
                    >

                    {org.status}

                    </span>


                </td>







                {/* Users */}

                <td className="p-4">

                    {org.users}

                </td>







                {/* Chatbots */}

                <td className="p-4">

                    {org.chatbots}

                </td>






                {/* Created */}

                <td className="p-4">

                    {
                    new Date(
                        org.createdAt
                    )
                    .toLocaleDateString()
                    }

                </td>








                {/* Actions */}

                <td className="p-4">


                <div className="flex gap-2">


                <button

                onClick={()=>


                    router.push(
                        `/organizations/${org.id}`
                    )


                }


                className="
                rounded-lg
                bg-slate-100
                px-3
                py-1
                text-sm
                hover:bg-slate-200
                "

                >

                    View

                </button>




                <button


                onClick={()=>


                    router.push(
                        `/organizations/${org.id}/edit`
                    )


                }


                className="
                rounded-lg
                bg-blue-600
                px-3
                py-1
                text-sm
                text-white
                hover:bg-blue-700
                "


                >

                    Edit

                </button>



                </div>


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
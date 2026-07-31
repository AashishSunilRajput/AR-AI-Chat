"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



interface Props {

    children: React.ReactNode;

    allowedRoles: string[];

}



export default function RoleGuard({

    children,

    allowedRoles

}: Props) {


    const router = useRouter();


    const [loading,setLoading] =
        useState(true);




    useEffect(()=>{


        const user =
            JSON.parse(
                localStorage.getItem("arai_user") || "{}"
            );



        if(
            !user.role ||
            !allowedRoles.includes(user.role)
        ){

            router.replace(
                "/dashboard"
            );

            return;

        }



        setLoading(false);



    },[]);





    if(loading){

        return (

            <div className="p-10">

                Checking permission...

            </div>

        );

    }




    return children;


}
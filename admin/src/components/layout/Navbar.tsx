"use client";

import { useEffect, useState } from "react";

import { Bell, Menu, Moon, Search } from "lucide-react";

import {
Avatar,
AvatarFallback,
} from "@/components/ui/avatar";

import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import authService from "@/services/auth.service";
import NotificationBell from "@/components/notifications/NotificationBell";


interface NavbarProps {

    onMenuClick?: () => void;

}


export default function Navbar({

    onMenuClick

}: NavbarProps) {


    const [user,setUser] = useState<any>(null);



    useEffect(()=>{


        const currentUser = authService.getUser();

        setUser(currentUser);


    },[]);



    return (

        <header
            className="
                flex
                h-16
                items-center
                justify-between
                border-b
                bg-white
                px-6
            "
        >

            {/* Left */}

            <div className="flex items-center gap-4">


                <button

                    onClick={onMenuClick}

                    className="
                        rounded-lg
                        p-2
                        transition
                        hover:bg-slate-100
                        lg:hidden
                    "

                >

                    <Menu size={22}/>

                </button>



                <div>

                    <h1 className="text-xl font-bold">

                        Dashboard

                    </h1>


                    <p className="text-sm text-muted-foreground">

                        Welcome back 👋

                    </p>


                </div>


            </div>



            {/* Center */}

            <div className="hidden md:flex">


                <div className="relative">


                    <Search

                        size={18}

                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "

                    />


                    <input

                        placeholder="Search..."

                        className="
                            w-80
                            rounded-xl
                            border
                            py-2
                            pl-10
                            pr-4
                            outline-none
                            transition
                            focus:border-blue-500
                        "

                    />


                </div>


            </div>



            {/* Right */}


            <div className="flex items-center gap-4">


               <NotificationBell />



                <button className="rounded-xl p-2 hover:bg-slate-100">

                    <Moon size={20}/>

                </button>




                <DropdownMenu>


                    <DropdownMenuTrigger>


                        <Avatar>


                            <AvatarFallback>


                                {
                                    user?.name
                                    ?.split(" ")
                                    .map((n:string)=>n[0])
                                    .join("")
                                    .toUpperCase()
                                    ||
                                    "AR"
                                }


                            </AvatarFallback>


                        </Avatar>


                    </DropdownMenuTrigger>



                    <DropdownMenuContent align="end">


                        <DropdownMenuItem>

                            {user?.name || "Profile"}

                        </DropdownMenuItem>



                        <DropdownMenuItem>

                            Settings

                        </DropdownMenuItem>



                        <DropdownMenuItem

                            onClick={()=>authService.logout()}

                            className="text-red-600 cursor-pointer"

                        >

                            Logout

                        </DropdownMenuItem>


                    </DropdownMenuContent>


                </DropdownMenu>



            </div>


        </header>

    );

}
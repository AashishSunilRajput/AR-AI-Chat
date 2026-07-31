"use client";


import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "./sidebar-menu";


import { 
    ScrollArea 
} from "@/components/ui/scroll-area";


import {
    Separator
} from "@/components/ui/separator";


import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";


import {
    LogOut
} from "lucide-react";


import authService from "@/services/auth.service";


import {
    useEffect,
    useState
} from "react";




export default function Sidebar(){


const [user,setUser] =
useState<any>(null);




useEffect(()=>{


    const currentUser =
    authService.getUser();


    setUser(currentUser);


},[]);





const menuItems =
sidebarMenu.filter((item:any)=>{


    if(!item.roles){

        return true;

    }


    return item.roles.includes(
        user?.role
    );


});





return (

<aside
className="
flex
h-screen
w-[280px]
flex-col
border-r
bg-white
"
>


<Logo />



<ScrollArea className="flex-1">


<div className="space-y-2 p-4">


{
menuItems.map((item)=>(


<SidebarItem

key={item.href}

title={item.title}

href={item.href}

icon={item.icon}

/>


))
}


</div>


</ScrollArea>




<Separator />




<div className="p-4">


<div
className="
rounded-2xl
border
bg-slate-50
p-4
"
>


<div className="flex items-center gap-3">


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



<div>


<h4 className="text-sm font-semibold">

{user?.name || "User"}

</h4>


<p className="text-xs text-muted-foreground">

{user?.role || "Admin"}

</p>


</div>



</div>





<button

onClick={()=>
authService.logout()
}


className="
mt-4
flex
w-full
items-center
justify-center
gap-2
rounded-xl
border
py-2
hover:bg-red-50
hover:text-red-600
"

>


<LogOut size={16}/>

Logout


</button>



</div>


</div>


</aside>

);


}
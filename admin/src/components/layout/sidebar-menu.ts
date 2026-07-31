import {
LayoutDashboard,
Bot,
Database,
MessageSquare,
Users,
UserCircle,
Building2,
BarChart3,
Settings
} from "lucide-react";


export const sidebarMenu = [


{
    title:"Dashboard",
    href:"/dashboard",
    icon:LayoutDashboard
},


{
    title:"Organizations",
    href:"/organizations",
    icon:Building2,
    roles:[
        "SUPER_ADMIN"
    ]
},


{
    title:"Users",
    href:"/users",
    icon:Users
},


{
    title:"Chatbots",
    href:"/chatbots",
    icon:Bot
},


{
    title:"Knowledge Bases",
    href:"/knowledge-bases",
    icon:Database
},


{
    title:"Conversations",
    href:"/conversations",
    icon:MessageSquare
},


{
    title:"Leads",
    href:"/leads",
    icon:Users
},


{
    title:"Visitors",
    href:"/visitors",
    icon:UserCircle
},


{
    title:"Analytics",
    href:"/analytics",
    icon:BarChart3
},


{
    title:"Settings",
    href:"/settings",
    icon:Settings
}


];
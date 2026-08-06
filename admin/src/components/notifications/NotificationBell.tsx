"use client";

import { useEffect, useState } from "react";
import {
    Bell,
    Check,
    MessageSquare,
    UserPlus,
    Users,
    FileText,
    Bot,
    AlertCircle,
} from "lucide-react";

import Link from "next/link";

import notificationService, {
    Notification,
} from "@/services/notification.service";


export default function NotificationBell() {


    const [open, setOpen] =
        useState(false);


    const [notifications, setNotifications] =
        useState<Notification[]>([]);


    const [unreadCount, setUnreadCount] =
        useState(0);


    const [loading, setLoading] =
        useState(false);



    // =====================================
    // Load Notifications
    // =====================================

    const loadNotifications = async () => {

        try {

            setLoading(true);


            const response =
                await notificationService.getNotifications({

                    limit: 5,

                    page: 1,

                });


            setNotifications(
                response.data
            );


            const unread =
                response.data.filter(
                    item => !item.isRead
                ).length;


            setUnreadCount(
                unread
            );


        }
        catch(error){

            console.error(
                "Notification Load Error:",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{


        loadNotifications();


        const interval =
            setInterval(()=>{

                loadNotifications();

            },30000);


        return ()=>clearInterval(interval);


    },[]);



    // =====================================
    // Mark All Read
    // =====================================

    const handleMarkAllRead = async()=>{


        try{


            await notificationService.markAllAsRead();


            setNotifications(

                notifications.map(item=>({

                    ...item,

                    isRead:true

                }))

            );


            setUnreadCount(0);


        }
        catch(error){

            console.error(
                error
            );

        }


    };



    // =====================================
    // Mark Single Read
    // =====================================

    const handleNotificationClick =
    async(notification:Notification)=>{


        if(!notification.isRead){


            await notificationService.markAsRead(
                notification.id
            );


            setUnreadCount(
                prev =>
                Math.max(
                    prev - 1,
                    0
                )
            );


        }


        setNotifications(

            notifications.map(item=>

                item.id === notification.id

                ?

                {
                    ...item,
                    isRead:true
                }

                :

                item

            )

        );


    };



    // =====================================
    // Type Icon
    // =====================================

    const getIcon = (
        type:string
    )=>{


        switch(type){


            case "NEW_LEAD":

                return (

                    <UserPlus
                        size={18}
                    />

                );


            case "NEW_VISITOR":

                return (

                    <Users
                        size={18}
                    />

                );


            case "NEW_CONVERSATION":

                return (

                    <MessageSquare
                        size={18}
                    />

                );


            case "KNOWLEDGE_IMPORTED":

                return (

                    <FileText
                        size={18}
                    />

                );


            case "CHATBOT_UPDATED":

                return (

                    <Bot
                        size={18}
                    />

                );


            default:

                return (

                    <AlertCircle
                        size={18}
                    />

                );


        }

    };



    // =====================================
    // Type Color
    // =====================================

    const getColor = (
        type:string
    )=>{


        switch(type){


            case "NEW_LEAD":

                return "bg-green-100 text-green-700";


            case "NEW_VISITOR":

                return "bg-blue-100 text-blue-700";


            case "NEW_CONVERSATION":

                return "bg-purple-100 text-purple-700";


            case "KNOWLEDGE_IMPORTED":

                return "bg-orange-100 text-orange-700";


            case "CHATBOT_UPDATED":

                return "bg-indigo-100 text-indigo-700";


            default:

                return "bg-slate-100 text-slate-700";


        }


    };



    // =====================================
    // Time Ago
    // =====================================

    const timeAgo = (
        date:string
    )=>{


        const seconds =
            Math.floor(

                (
                    Date.now()
                    -
                    new Date(date).getTime()

                )

                /

                1000

            );


        if(seconds < 60)
            return `${seconds}s ago`;


        if(seconds < 3600)
            return `${Math.floor(seconds/60)}m ago`;


        if(seconds < 86400)
            return `${Math.floor(seconds/3600)}h ago`;


        return `${Math.floor(seconds/86400)}d ago`;

    };



    return (

        <div
            className="
                relative
            "
        >


            {/* Bell Button */}

            <button

                onClick={()=>setOpen(!open)}

                className="
                    relative
                    rounded-xl
                    p-2
                    hover:bg-slate-100
                "

            >

                <Bell size={20}/>



                {
                    unreadCount > 0 && (

                        <span

                            className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                h-5
                                min-w-5
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                px-1
                                text-xs
                                font-bold
                                text-white
                            "

                        >

                            {
                                unreadCount > 99
                                ?
                                "99+"
                                :
                                unreadCount
                            }


                        </span>

                    )
                }


            </button>





            {
                open && (


                    <div

                        className="
                            absolute
                            right-0
                            mt-3
                            w-96
                            rounded-xl
                            border
                            bg-white
                            shadow-xl
                            z-50
                        "

                    >


                        {/* Header */}

                        <div

                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                px-4
                                py-3
                            "

                        >

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                    "
                                >
                                    Notifications

                                </h3>


                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                    "
                                >

                                    {unreadCount} unread

                                </p>


                            </div>


                            {
                                unreadCount > 0 && (

                                    <button

                                        onClick={
                                            handleMarkAllRead
                                        }

                                        className="
                                            text-sm
                                            text-blue-600
                                            hover:underline
                                        "

                                    >

                                        Mark all read

                                    </button>

                                )
                            }


                        </div>





                        {/* List */}


                        <div
                            className="
                                max-h-96
                                overflow-y-auto
                            "
                        >

                        {
                            loading ?

                            (

                                <div
                                    className="
                                        p-6
                                        text-center
                                    "
                                >

                                    Loading...

                                </div>

                            )

                            :

                            notifications.map(
                                notification=>(


                                    <Link

                                        key={
                                            notification.id
                                        }

                                        href={
                                            notification.entityType==="LEAD"
                                            ?
                                            `/leads/${notification.entityId}`
                                            :
                                            notification.entityType==="CONVERSATION"
                                            ?
                                            `/conversations/${notification.entityId}`
                                            :
                                            notification.entityType==="VISITOR"
                                            ?
                                            `/visitors/${notification.entityId}`
                                            :
                                            "/notifications"
                                        }


                                        onClick={()=>{

                                            handleNotificationClick(
                                                notification
                                            );

                                        }}

                                        className={`
                                            flex
                                            gap-3
                                            border-b
                                            px-4
                                            py-3
                                            hover:bg-slate-50

                                            ${
                                                !notification.isRead
                                                ?
                                                "bg-blue-50"
                                                :
                                                ""
                                            }

                                        `}

                                    >


                                        <div

                                            className={`
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full

                                                ${
                                                    getColor(
                                                        notification.type
                                                    )
                                                }

                                            `}

                                        >

                                            {
                                                getIcon(
                                                    notification.type
                                                )
                                            }


                                        </div>



                                        <div
                                            className="
                                                flex-1
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    justify-between
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-sm
                                                        font-semibold
                                                    "
                                                >

                                                    {
                                                        notification.title
                                                    }

                                                </p>


                                                {
                                                    notification.isRead && (

                                                        <Check
                                                            size={15}
                                                            className="
                                                                text-green-600
                                                            "
                                                        />

                                                    )
                                                }


                                            </div>



                                            <p
                                                className="
                                                    text-xs
                                                    text-slate-600
                                                "
                                            >

                                                {
                                                    notification.message
                                                }

                                            </p>



                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    text-slate-400
                                                "
                                            >

                                                {
                                                    timeAgo(
                                                        notification.createdAt
                                                    )
                                                }

                                            </p>



                                        </div>


                                    </Link>


                                )

                            )

                        }


                        </div>





                        {/* Footer */}


                        <div

                            className="
                                border-t
                                p-3
                                text-center
                            "

                        >

                            <Link

                                href="/notifications"

                                className="
                                    text-sm
                                    font-medium
                                    text-blue-600
                                    hover:underline
                                "

                            >

                                View All Notifications

                            </Link>


                        </div>



                    </div>


                )
            }


        </div>

    );

}
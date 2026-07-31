"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

interface Props {

    title: string;

    href: string;

    icon: React.ElementType;

}

export default function SidebarItem({

    title,

    href,

    icon: Icon

}: Props) {

    const pathname = usePathname();

    const active = pathname === href;

    return (

        <Link
            href={href}
            className={clsx(

                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",

                active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"

            )}
        >

            <Icon size={20} />

            <span>

                {title}

            </span>

        </Link>

    );
}
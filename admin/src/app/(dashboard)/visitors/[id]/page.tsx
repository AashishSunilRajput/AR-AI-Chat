"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import visitorService, {
    Visitor
} from "@/services/visitor.service";

import VisitorInfoCard from "@/components/visitors/VisitorInfoCard";
import ConversationHistoryCard from "@/components/visitors/ConversationHistoryCard";
import LeadHistoryCard from "@/components/visitors/LeadHistoryCard";
import VisitorActivityCard from "@/components/visitors/VisitorActivityCard";

export default function VisitorDetailPage() {

    const params = useParams();

    const [visitor, setVisitor] =
        useState<Visitor>();

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadVisitor();

    }, []);

    const loadVisitor = async () => {

        try {

            const res =
                await visitorService.getVisitor(

                    Number(params.id)

                );

            setVisitor(

                res.data

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="p-6">

                Loading...

            </div>

        );

    }

    if (!visitor) {

        return (

            <div className="p-6">

                Visitor not found.

            </div>

        );

    }

    return (

        <div className="space-y-6 p-6">

          <div className="flex items-center justify-between">

    <div>

        <h1 className="text-3xl font-bold">

            Visitor Details

        </h1>

        <p className="text-slate-500">

            Visitor #{visitor.id}

        </p>

    </div>

    <Link

        href="/visitors"

        className="px-4 py-2 rounded-lg border hover:bg-slate-100"

    >

        ← Back to Visitors

    </Link>

</div>

            <VisitorInfoCard
                visitor={visitor}
            />

            <VisitorActivityCard
                visitor={visitor}
            />

            <ConversationHistoryCard
                visitor={visitor}
            />

            <LeadHistoryCard
                visitor={visitor}
            />

        </div>

    );

}
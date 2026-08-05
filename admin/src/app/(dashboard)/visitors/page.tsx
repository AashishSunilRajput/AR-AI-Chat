"use client";

import { useEffect, useMemo, useState } from "react";

import visitorService, {
    Visitor,
    VisitorStats
} from "@/services/visitor.service";

import VisitorStatsGrid from "@/components/visitors/VisitorStatsGrid";
import VisitorTable from "@/components/visitors/VisitorTable";
import Pagination from "@/components/common/Pagination";
import ExportButton from "@/components/common/ExportButton";
import exportService from "@/services/export.service";

export default function VisitorsPage() {

    const [visitors, setVisitors] =
        useState<Visitor[]>([]);

    const [stats, setStats] =
        useState<VisitorStats>();

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("ALL");

        const [page,setPage] =
useState(1);


const [pagination,setPagination] =
useState({

    total:0,

    page:1,

    limit:10,

    totalPages:1

});

const [exportLoading, setExportLoading] =
useState(false);

const handleExport = async (

    format:"csv"|"xlsx"|"pdf"

)=>{

    try{

        setExportLoading(true);

        await exportService.exportVisitors(

            format,

            {

                search

            }

        );

    }

    catch(error){

        console.error(error);

        alert("Export failed");

    }

    finally{

        setExportLoading(false);

    }

};




   const loadData = async()=>{

try{


const [
 visitorsRes,
 statsRes
]=await Promise.all([


visitorService.getVisitors({

    search,

    page,

    limit:10

}),


visitorService.getStats()


]);



setVisitors(

    visitorsRes.data

);



setPagination(

    visitorsRes.pagination

);



setStats(

    statsRes.data

);



}
catch(error){

console.error(error);

}
finally{

setLoading(false);

}


};

   useEffect(()=>{

loadData();

},[
search,
page
]);

    const filteredVisitors = useMemo(() => {

        return visitors.filter((visitor) => {

            const keyword =
                search.toLowerCase();

            const matchesSearch =

                (visitor.name ?? "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                (visitor.email ?? "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                (visitor.chatbot?.name ?? "")
                    .toLowerCase()
                    .includes(keyword);

            if (filter === "ALL") {

                return matchesSearch;

            }

            if (filter === "WITH_LEADS") {

                return (
                    matchesSearch &&
                    (visitor._count?.leads || 0) > 0
                );

            }

            if (filter === "WITHOUT_LEADS") {

                return (
                    matchesSearch &&
                    (visitor._count?.leads || 0) === 0
                );

            }

            return matchesSearch;

        });

    }, [

        visitors,

        search,

        filter

    ]);
    

    if (loading) {

        return (

            <div className="p-6">

                Loading...

            </div>

        );

    }

    return (

        <div className="space-y-6 p-6">

          <div className="flex items-center justify-between">

    <div>

        <h1 className="text-3xl font-bold">

            Visitors

        </h1>

        <p className="text-slate-500">

            Manage all website visitors

        </p>

    </div>

    <ExportButton

        onExport={handleExport}

        loading={exportLoading}

    />

</div>

            {

                stats && (

                    <VisitorStatsGrid

                        stats={stats}

                    />

                )

            }

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <input

                    type="text"

                    placeholder="Search by name, email or chatbot..."

                    value={search}

                    onChange={(e) =>

                        setSearch(
                            e.target.value
                        )

                    }

                    className="w-full md:w-80 border rounded-lg px-4 py-2"

                />

                <select

                    value={filter}

                    onChange={(e) =>

                        setFilter(
                            e.target.value
                        )

                    }

                    className="border rounded-lg px-4 py-2"

                >

                    <option value="ALL">

                        All Visitors

                    </option>

                    <option value="WITH_LEADS">

                        With Leads

                    </option>

                    <option value="WITHOUT_LEADS">

                        Without Leads

                    </option>

                </select>

            </div>

            <VisitorTable

                visitors={filteredVisitors}

            />
            <Pagination

currentPage={pagination.page}
    
                    totalPages={pagination.totalPages}
    
                    onPageChange={setPage}

/>

        </div>

    );

}
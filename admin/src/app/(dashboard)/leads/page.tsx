"use client";

import { useEffect, useState } from "react";

import leadService, {
    Lead,
    LeadStats as LeadStatsType,
} from "@/services/lead.service";

import exportService from "@/services/export.service";

import LeadStats from "@/components/leads/LeadStats";
import LeadFilters from "@/components/leads/LeadFilters";
import LeadTable from "@/components/leads/LeadTable";
import ExportButton from "@/components/common/ExportButton";
import Pagination from "@/components/common/Pagination";


export default function LeadsPage() {


    const [loading, setLoading] =
        useState(true);


    const [exportLoading, setExportLoading] =
        useState(false);



    const [leads, setLeads] =
        useState<Lead[]>([]);



    const [stats, setStats] =
        useState<LeadStatsType>({
            total:0,
            new:0,
            contacted:0,
            qualified:0,
            converted:0,
            lost:0,
        });



    // Filters

    const [search, setSearch] =
        useState("");


    const [status, setStatus] =
        useState("ALL");


    const [source, setSource] =
        useState("ALL");


    const [from, setFrom] =
        useState("");


    const [to, setTo] =
        useState("");

        const [page,setPage] =
useState(1);


const [pagination,setPagination] =
useState({

total:0,

page:1,

limit:10,

totalPages:1

});




    // ======================================
    // Load Data
    // ======================================

    const loadData = async()=>{


        try{


            setLoading(true);


          const [
    leadsResponse,
    statsResponse
] = await Promise.all([


   leadService.getLeads({

    search,

    status,

    source,

    from,

    to,

    page,

    limit:10

}),


    leadService.getStats()


]);



           setLeads(
    leadsResponse.data
);


setPagination(
    leadsResponse.pagination
);


setStats(
    statsResponse.data
);


        }
        catch(error){


            console.error(
                error
            );


        }
        finally{


            setLoading(false);


        }


    };




 useEffect(()=>{

    loadData();

},[
    search,
    status,
    source,
    from,
    to,
    page
]);





    // ======================================
    // Export
    // ======================================


  const handleExport = async(
    format:"csv"|"xlsx"|"pdf"
)=>{

    try{

        setExportLoading(true);


        await exportService.exportLeads(

            format,

            {
                search,
                status,
                source,
                from,
                to
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







    // ======================================
    // Filter Logic
    // ======================================

    return (


        <div className="space-y-6">



            {/* Header */}

            <div className="
                flex
                items-center
                justify-between
            ">


                <div>


                    <h1 className="
                        text-3xl
                        font-bold
                    ">

                        Leads

                    </h1>



                    <p className="
                        mt-2
                        text-slate-500
                    ">

                        Manage all customer leads

                    </p>


                </div>




                <ExportButton

                    onExport={handleExport}

                    loading={exportLoading}

                />


            </div>





            {/* Stats */}


            <LeadStats

                stats={stats}

            />






            {/* Filters */}


            <LeadFilters


                search={search}

                onSearchChange={setSearch}



                status={status}

                onStatusChange={setStatus}



                source={source}

                onSourceChange={setSource}



                from={from}

                onFromChange={setFrom}



                to={to}

                onToChange={setTo}


            />







            {/* Table */}


         <LeadTable

    loading={loading}

    leads={leads}

/>

<Pagination

    
    
                    currentPage={pagination.page}
    
                    totalPages={pagination.totalPages}
    
                    onPageChange={setPage}
    
/>

        </div>


    );

}
interface LeadFiltersProps {

    search: string;

    onSearchChange: (
        value: string
    ) => void;


    status: string;

    onStatusChange: (
        value: string
    ) => void;



    source: string;

    onSourceChange: (
        value: string
    ) => void;



    from: string;

    onFromChange: (
        value: string
    ) => void;



    to: string;

    onToChange: (
        value: string
    ) => void;

}



export default function LeadFilters({

    search,

    onSearchChange,


    status,

    onStatusChange,


    source,

    onSourceChange,


    from,

    onFromChange,


    to,

    onToChange,


}: LeadFiltersProps) {


    return (

        <div className="
            bg-white
            border
            rounded-xl
            p-4
        ">


            <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
            ">


                {/* Search */}

                <input

                    type="text"

                    placeholder="
                        Search by name, email, phone...
                    "

                    value={search}

                    onChange={(e)=>
                        onSearchChange(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        rounded-lg
                        border
                        px-4
                        py-2
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "

                />




                {/* Status */}

                <select

                    value={status}

                    onChange={(e)=>
                        onStatusChange(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        rounded-lg
                        border
                        px-4
                        py-2
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "

                >

                    <option value="ALL">
                        All Status
                    </option>


                    <option value="NEW">
                        New
                    </option>


                    <option value="CONTACTED">
                        Contacted
                    </option>


                    <option value="QUALIFIED">
                        Qualified
                    </option>


                    <option value="CONVERTED">
                        Converted
                    </option>


                    <option value="LOST">
                        Lost
                    </option>


                </select>





                {/* Source */}

                <select

                    value={source}

                    onChange={(e)=>
                        onSourceChange(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        rounded-lg
                        border
                        px-4
                        py-2
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "

                >

                    <option value="ALL">
                        All Sources
                    </option>


                    <option value="widget">
                        Widget
                    </option>


                    <option value="manual">
                        Manual
                    </option>


                    <option value="api">
                        API
                    </option>


                </select>




                {/* From Date */}

                <input

                    type="date"

                    value={from}

                    onChange={(e)=>
                        onFromChange(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        rounded-lg
                        border
                        px-4
                        py-2
                    "

                />




                {/* To Date */}

                <input

                    type="date"

                    value={to}

                    onChange={(e)=>
                        onToChange(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        rounded-lg
                        border
                        px-4
                        py-2
                    "

                />


            </div>


        </div>

    );

}
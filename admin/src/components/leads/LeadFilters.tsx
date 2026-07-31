interface LeadFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;

    status: string;
    onStatusChange: (value: string) => void;
}

export default function LeadFilters({

    search,
    onSearchChange,

    status,
    onStatusChange,

}: LeadFiltersProps) {

    return (

        <div className="bg-white border rounded-xl p-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                    className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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

            </div>

        </div>

    );

}
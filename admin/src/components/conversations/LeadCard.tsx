interface Lead {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string;
  status: string;
  createdAt: string;
}

interface LeadCardProps {
  leads?: Lead[];
}

export default function LeadCard({
  leads = [],
}: LeadCardProps) {

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Lead Information
          </h2>
        </div>

        <div className="p-6 text-gray-500">
          No lead generated yet.
        </div>
      </div>
    );
  }

  const lead = leads[leads.length - 1];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Lead Information
        </h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">
            Name
          </p>

          <p className="font-medium">
            {lead.name || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="font-medium break-all">
            {lead.email || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Phone
          </p>

          <p className="font-medium">
            {lead.phone || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Company
          </p>

          <p className="font-medium">
            {lead.company || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Source
          </p>

          <p className="font-medium uppercase">
            {lead.source}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {lead.status}
          </span>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">
            Created
          </p>

          <p className="font-medium">
            {new Date(
              lead.createdAt
            ).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
}
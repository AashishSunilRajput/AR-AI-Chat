"use client";

interface VisitorCardProps {
  visitor?: {
    name?: string | null;
    email?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    lastSeenAt?: string | null;
  } | null;
}

export default function VisitorCard({
  visitor = null,
}: VisitorCardProps) {


  if (!visitor) {

    return (
      <div className="rounded-2xl border bg-white p-6">

        <h2 className="text-lg font-semibold">
          Visitor Information
        </h2>

        <p className="mt-3 text-gray-500">
          Visitor data not available
        </p>

      </div>
    );

  }


  const browser =
    visitor?.userAgent?.split("/")[0] || "Unknown";


  return (

    <div className="rounded-2xl border bg-white shadow-sm">


      <div className="p-6 border-b">

        <h2 className="text-lg font-semibold">
          Visitor Information
        </h2>

      </div>


      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">


        <div>
          <p className="text-sm text-gray-500">
            Name
          </p>

          <p className="font-medium">
            {visitor.name || "Anonymous"}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="font-medium">
            {visitor.email || "Not Provided"}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            IP Address
          </p>

          <p className="font-medium">
            {visitor.ipAddress || "Unknown"}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Browser
          </p>

          <p className="font-medium">
            {browser}
          </p>
        </div>


        <div className="md:col-span-2">

          <p className="text-sm text-gray-500">
            Last Seen
          </p>

          <p className="font-medium">
            {
              visitor.lastSeenAt
                ? new Date(
                    visitor.lastSeenAt
                  ).toLocaleString()
                : "Unknown"
            }
          </p>

        </div>


      </div>


    </div>

  );

}
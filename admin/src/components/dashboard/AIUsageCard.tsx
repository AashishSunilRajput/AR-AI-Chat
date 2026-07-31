export default function AIUsageCard() {

    return (

        <div className="rounded-2xl border bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

            <h3 className="text-lg font-semibold">

                AI Usage

            </h3>

            <h2 className="mt-5 text-4xl font-bold">

                74%

            </h2>

            <p className="mt-3 text-blue-100">

                74,000 / 100,000 Tokens Used

            </p>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">

                <div

                    className="h-full w-[74%] rounded-full bg-white"

                />

            </div>

        </div>

    );

}
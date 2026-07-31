export default function ConversationSkeleton() {

    return (

        <>

            {[1, 2, 3, 4, 5].map((item) => (

                <tr
                    key={item}
                    className="border-t animate-pulse"
                >

                    <td className="px-6 py-4">

                        <div className="h-4 w-32 rounded bg-slate-200" />

                        <div className="mt-2 h-3 w-40 rounded bg-slate-100" />

                    </td>

                    <td>

                        <div className="h-4 w-24 rounded bg-slate-200" />

                    </td>

                    <td>

                        <div className="h-4 w-10 rounded bg-slate-200" />

                    </td>

                    <td>

                        <div className="h-6 w-20 rounded-full bg-slate-200" />

                    </td>

                    <td>

                        <div className="h-4 w-36 rounded bg-slate-200" />

                    </td>

                    <td className="pr-6 text-right">

                        <div className="ml-auto h-9 w-20 rounded-lg bg-slate-200" />

                    </td>

                </tr>

            ))}

        </>

    );

}
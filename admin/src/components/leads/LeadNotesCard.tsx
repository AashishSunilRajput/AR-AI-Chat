"use client";

import { useState } from "react";


interface LeadNotesCardProps {

    lead: {

        id: number;

        notes?: string | null;

    };

}



export default function LeadNotesCard({

    lead

}: LeadNotesCardProps) {


    const [notes, setNotes] = useState(

        lead.notes || ""

    );


    const [saving, setSaving] = useState(false);



    const handleSave = async () => {


        try {


            setSaving(true);


            // API integration next step me add karenge

            console.log({

                leadId: lead.id,

                notes

            });



        }

        catch(error) {


            console.error(error);


        }

        finally {


            setSaving(false);


        }


    };



    return (

        <div className="bg-white rounded-xl border p-6 space-y-5">


            <div>

                <h2 className="text-xl font-semibold">

                    Notes

                </h2>


                <p className="text-sm text-slate-500">

                    Add internal notes for this lead

                </p>

            </div>



            <textarea

                value={notes}

                onChange={(e) =>
                    setNotes(
                        e.target.value
                    )
                }

                placeholder="Write notes here..."

                rows={5}

                className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"

            />



            <div className="flex justify-end">


                <button

                    onClick={handleSave}

                    disabled={saving}

                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"

                >

                    {
                        saving
                        ?
                        "Saving..."
                        :
                        "Save Notes"
                    }

                </button>


            </div>


        </div>

    );

}
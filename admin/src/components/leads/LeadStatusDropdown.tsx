"use client";

import { useState } from "react";
import leadService from "@/services/lead.service";

interface LeadStatusDropdownProps {

    leadId: number;

    status:
        | "NEW"
        | "CONTACTED"
        | "QUALIFIED"
        | "CONVERTED"
        | "LOST";

    onUpdated?: (
        status: string
    ) => void;

}

export default function LeadStatusDropdown({

    leadId,

    status,

    onUpdated

}: LeadStatusDropdownProps) {

    const [value, setValue] =
        useState(status);

    const [loading, setLoading] =
        useState(false);

    const handleChange = async (

        e: React.ChangeEvent<HTMLSelectElement>

    ) => {

        const newStatus = e.target.value as typeof value;

        try {

            setLoading(true);

            setValue(newStatus);

            await leadService.updateLead(

                leadId,

                {
                    status: newStatus
                }

            );

            onUpdated?.(newStatus);

        }

        catch (error) {

            console.error(error);

            alert("Failed to update status.");

            setValue(status);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <select

            value={value}

            onChange={handleChange}

            disabled={loading}

            className="border rounded-lg px-3 py-2 bg-white"

        >

            <option value="NEW">
                NEW
            </option>

            <option value="CONTACTED">
                CONTACTED
            </option>

            <option value="QUALIFIED">
                QUALIFIED
            </option>

            <option value="CONVERTED">
                CONVERTED
            </option>

            <option value="LOST">
                LOST
            </option>

        </select>

    );

}
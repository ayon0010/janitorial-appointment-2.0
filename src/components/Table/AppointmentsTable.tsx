"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";

export default function AppointmentsTable({ initialData }: any) {
    const [appointments, setAppointments] = useState(initialData);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;

        const result = await Swal.fire({
            title: "Delete selected appointments?",
            text: `${selectedIds.length} items will be deleted`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        const res = await fetch("/api/appointments/bulk-delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: selectedIds }),
        });

        const data = await res.json();

        if (data.success) {
            setAppointments((prev: any) =>
                prev.filter((item: any) => !selectedIds.includes(item.id))
            );
            setSelectedIds([]);

            Swal.fire("Deleted!", "Appointments removed", "success");
        } else {
            Swal.fire("Error", "Failed to delete", "error");
        }
    };

    return (
        <div>
            {/* BULK ACTION BAR */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={handleBulkDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Delete Selected ({selectedIds.length})
                </button>
            </div>

            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="pr-10"></th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Service Area</th>
                    </tr>
                </thead>

                <tbody>
                    {appointments.map((m: any) => (
                        <tr key={m.id} className="border-b">
                            {/* CHECKBOX */}
                            <td className="">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(m.id)}
                                    className="w-10 h-10"
                                    onChange={() => toggleSelect(m.id)}
                                />
                            </td>

                            {/* <td>{format(new Date(m.createdAt), "dd MMM yyyy, HH:mm")}</td> */}
                            <td>{m.firstName} {m.lastName}</td>
                            <td>{m.email}</td>
                            <td>{m.companyName}</td>
                            <td>{m.dncList || "—"}</td>
                            <td>{m.serviceArea || "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
"use client";
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from "sweetalert2";

interface AppointmentDeleteProps {
    id: string;
}

const AppointmentDelete: React.FC<AppointmentDeleteProps> = (props) => {

    const { id } = props;
    const router = useRouter();


    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This appointment will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete");
            }

            await response.json();

            Swal.fire({
                title: "Deleted!",
                text: "Appointment has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            // optional: refresh UI or router refresh
            router.refresh();
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong while deleting.",
                icon: "error",
            });
        }
    };

    return (
        <button onClick={() => handleDelete()} className='cursor-pointer'>
            <Trash className='text-red-500 size-5' />
        </button>
    )
}

export default AppointmentDelete;
import React from 'react'
import {
    UserCheck,
    ClipboardCheck,
    MapPin,
    CalendarCheck,
    BellRing,
} from "lucide-react";

export const qualificationSteps = [
    {
        id: "01",
        title: "Decision-Maker Identification",
        description:
            "We verify that the contact has the authority to evaluate and approve commercial cleaning services for their facility.",
        icon: UserCheck,
    },
    {
        id: "02",
        title: "Needs & Interest Assessment",
        description:
            "Our team confirms the prospect is actively considering a new janitorial or commercial cleaning provider.",
        icon: ClipboardCheck,
    },
    {
        id: "03",
        title: "Service Compatibility Check",
        description:
            "Appointments are scheduled only with businesses that fit your service area, target market, and operational capacity.",
        icon: MapPin,
    },
    {
        id: "04",
        title: "Meeting Scheduling & Confirmation",
        description:
            "Qualified prospects receive a calendar invitation and personally confirm the appointment before it reaches your schedule.",
        icon: CalendarCheck,
    },
    {
        id: "05",
        title: "Attendance Assurance Process",
        description:
            "We use multiple reminders through phone calls and email follow-ups to maximize appointment attendance and reduce no-shows.",
        icon: BellRing,
    },
];

const Works = () => {
    return (
        <div className='py-20'>
            <div className='container '>
                <div className='text-center max-w-2xl mx-auto mb-16'>
                    <span
                        className='inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3'
                        data-aos='fade-up'
                        data-aos-delay='0'
                        data-aos-duration='600'>
                        Commercial Cleaning Appointment Qualification
                    </span>
                    <h2
                        className='text-secondary dark:text-white text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-tight'
                        data-aos='fade-up'
                        data-aos-delay='100'
                        data-aos-duration='600'>
                        Qualified Leads. Scheduled Meetings. Better Results.
                    </h2>
                </div>
                <div className='grid md:grid-cols-5 grid-cols-1 md:gap-4 gap-6'>
                    {
                        qualificationSteps?.map((q, i) => {
                            const Icon = q.icon;
                            return (
                                <div
                                    data-aos='fade-up'
                                    data-aos-delay={150 + i * 100}
                                    data-aos-duration='700'
                                    key={i} className='p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col gap-2'>
                                    <div className='flex items-center justify-between'>
                                        <div className='p-2 bg-blue-500 w-fit h-fit rounded-full'>
                                            <Icon className='w-6 h-6 text-white' />
                                        </div>
                                        <p className='text-gray-700 text-2xl font-semibold'>0{i + 1}</p>
                                    </div>
                                    <h3 className='text-lg font-semibold'>{q.title}</h3>
                                    <p className='text-sm font-medium'>{q.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Works;
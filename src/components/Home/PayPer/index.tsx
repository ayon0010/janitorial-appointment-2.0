import { Calendar1 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Calendar, Building2, MapPin, User } from 'lucide-react';

function LeadCardSection() {
    return (
        <div className="relative flex w-full items-center justify-center h-full">
            {/* Top-Left Metric: Appointments Sold */}
            <div className="absolute left-0 top-0 rounded-2xl bg-slate-900 backdrop-blur-md border border-white/5 px-4 py-3 sm:px-5 sm:py-4 hidden md:block">
                <p className="text-xs font-medium text-white sm:text-sm">Appointments Sold</p>
                <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">240K+</p>
            </div>
            {/* Right Metric: Retention */}
            <div className="absolute right-0 bottom-0 rounded-2xl bg-slate-900 backdrop-blur-md border border-white/5 px-4 py-3 text-center sm:px-5 sm:py-4 hidden md:block">
                <p className="text-xs font-medium text-white sm:text-sm">Retention</p>
                <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">92%</p>
            </div>
            {/* Main Outer Container / Border Frame */}
            <div className="relative flex h-auto w-full max-w-4xl items-center justify-center rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6 sm:p-12">
                <div className="relative w-full max-w-md">
                    {/* Decorative Back Card Shadow Effect */}
                    <div className="absolute inset-0 transform rounded-3xl bg-slate-900/40 opacity-70 blur-sm translate-y-2 scale-95" />

                    {/* Main Content Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1e36] p-6 shadow-2xl transition-all hover:border-cyan-500/30 sm:p-8">
                        {/* Soft Blue Glow Behind the Card */}
                        <div className="absolute -inset-10 -z-10 rounded-full bg-cyan-500/10 blur-3xl" />

                        {/* Header: Icon & Title */}
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20">
                                <Calendar className="h-6 w-6" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white sm:text-xl">Appointment Booked</h3>
                                <p className="text-sm text-slate-400">Monday at 2:00 PM</p>
                            </div>
                        </div>

                        {/* Card Details Body */}
                        <div className="mt-6 space-y-4 border-b border-white/5 pb-6">
                            <div className="flex items-center gap-3 text-slate-200">
                                <Building2 className="h-5 w-5 text-cyan-400 shrink-0" />
                                <span className="text-sm font-medium sm:text-base">Aegis Dental</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-200">
                                <MapPin className="h-5 w-5 text-cyan-400 shrink-0" />
                                <span className="text-sm font-medium sm:text-base">Dallas, TX</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-200">
                                <User className="h-5 w-5 text-cyan-400 shrink-0" />
                                <span className="text-sm font-medium sm:text-base">Jennele Rogers, Doctor</span>
                            </div>
                        </div>

                        {/* Card Footer: Status & Budget */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/80 px-3 py-1.5 border border-cyan-500/20 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                                Confirmed
                            </div>
                            <span className="text-xs text-slate-400 sm:text-sm">
                                Budget: <strong className="font-semibold text-white">$2,100/mo</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PayPerAppointment = () => {
    return (
        <div className='py-10 grid md:grid-cols-2 grid-cols-1 gap-10 container'>
            <div className='flex-1 h-full'>
                <LeadCardSection />
            </div>
            <div className='flex-1'>
                <div
                    className=''>
                    <h2 className='text-secondary dark:text-white max-w-420 pb-8'>
                        Simple Pay-Per-Appointment Pricing
                    </h2>
                    <p className='text-base font-normal text-SlateBlue dark:text-darktext max-w-408'>
                        Pay only for qualified appointments that take place. There are no upfront costs, long-term commitments, or hidden fees. We earn your business by consistently delivering verified decision-makers directly to your calendar. If a confirmed prospect doesn't attend the meeting, you won't be charged.
                    </p>
                    <div className='pt-6 flex flex-col gap-y-5'>
                        <div className='flex items-center gap-2'>
                            <svg
                                width='25'
                                height='25'
                                viewBox='0 0 25 25'
                                fill='#F3FAFF'
                                className='dark:fill-primary/20 fill-primary/20 shrink-0 w-[25px] h-[25px]'
                                xmlns='http://www.w3.org/2000/svg'>
                                <circle cx='12.5' cy='12.5' r='12.5' />
                                <g clipPath='url(#clip0_7_836)'>
                                    <path
                                        d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                                        fill='#2F73F2'
                                    />
                                </g>
                                <defs>
                                    <clipPath id='clip0_7_836'>
                                        <rect
                                            width='11'
                                            height='11'
                                            fill='white'
                                            transform='translate(7 7)'
                                        />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                                No lengthy contracts
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <svg
                                width='25'
                                height='25'
                                viewBox='0 0 25 25'
                                fill='#F3FAFF'
                                className='dark:fill-primary/20 fill-primary/20 shrink-0 w-[25px] h-[25px]'
                                xmlns='http://www.w3.org/2000/svg'>
                                <circle cx='12.5' cy='12.5' r='12.5' />
                                <g clipPath='url(#clip0_7_836)'>
                                    <path
                                        d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                                        fill='#2F73F2'
                                    />
                                </g>
                                <defs>
                                    <clipPath id='clip0_7_836'>
                                        <rect
                                            width='11'
                                            height='11'
                                            fill='white'
                                            transform='translate(7 7)'
                                        />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                                Flexible month-to-month service
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <svg
                                width='25'
                                height='25'
                                viewBox='0 0 25 25'
                                fill='#F3FAFF'
                                className='dark:fill-primary/20 fill-primary/20 shrink-0 w-[25px] h-[25px]'
                                xmlns='http://www.w3.org/2000/svg'>
                                <circle cx='12.5' cy='12.5' r='12.5' />
                                <g clipPath='url(#clip0_7_836)'>
                                    <path
                                        d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                                        fill='#2F73F2'
                                    />
                                </g>
                                <defs>
                                    <clipPath id='clip0_7_836'>
                                        <rect
                                            width='11'
                                            height='11'
                                            fill='white'
                                            transform='translate(7 7)'
                                        />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                                100% exclusive appointments
                            </span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <Link href='/contact' className='btn inline-flex items-center gap-3 cursor-pointer'>
                            Get Started
                            <i className="bg-[url('/images/build-amazing/right-arrow.svg')] bg-no-repeat bg-contain w-4 h-3 inline-block ml-1"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayPerAppointment

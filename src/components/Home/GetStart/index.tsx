import React from 'react'
import Link from 'next/link'

const steps = [
    {
        number: '01',
        title: (
            <>
                Choose How You <br /> Want Leads
            </>
        ),
        description: (
            <>
                Pick from Dedicated Team, <br /> Cold Calling Agent, or Direct Leads
            </>
        ),
    },
    {
        number: '02',
        title: (
            <>
                Set Your <br /> Preferences
            </>
        ),
        description: (
            <>
                Tell us your target industry, <br /> service areas, and lead goals
            </>
        ),
    },
    {
        number: '03',
        title: (
            <>
                We Generate & <br /> Qualify Leads
            </>
        ),
        description: (
            <>
                Our team handles research, <br /> calls, and appointment setting
            </>
        ),
    },
    {
        number: '04',
        title: (
            <>
                Receive Leads or <br /> Booked Appointments
            </>
        ),
        description: (
            <>
                Get leads sent to you directly <br /> or receive live booked calls
            </>
        ),
    }
]

const GetStart = () => {
    return (
        <section className='relative py-20 overflow-hidden bg-linear-to-b from-white to-AliceBlue dark:from-darkmode dark:to-darklight'>
            <div className='container relative z-10'>
                <div className='text-center max-w-2xl mx-auto mb-16'>
                    <span
                        className='inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3'
                        data-aos='fade-up'
                        data-aos-delay='0'
                        data-aos-duration='600'>
                        Four easy steps
                    </span>
                    <h2
                        className='text-secondary dark:text-white text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-tight'
                        data-aos='fade-up'
                        data-aos-delay='100'
                        data-aos-duration='600'>
                        How To Get Started
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8'>
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className='group relative'
                            data-aos='fade-up'
                            data-aos-delay={150 + index * 100}
                            data-aos-duration='700'>
                            {/* Connector line - visible between cards on xl */}
                            {index < steps.length - 1 && (
                                <div
                                    className='hidden xl:block absolute top-14 left-[calc(100%+0.5rem)] w-[calc(100%-2rem)] h-0.5 bg-primary/20 dark:bg-primary/30 -translate-y-1/2 pointer-events-none'
                                    aria-hidden
                                />
                            )}

                            <div className='relative h-full bg-white dark:bg-darklight rounded-2xl p-8 shadow-light_shadwo dark:shadow-darkmd border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/30 hover:-translate-y-1'>
                                {/* Step number */}
                                <div className='inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold text-xl mb-6'>
                                    {step.number}
                                </div>

                                <h3 className='text-xl sm:text-2xl font-bold text-secondary dark:text-white leading-snug mb-4'>
                                    {step.title}
                                </h3>
                                <p className='text-SlateBlue dark:text-darktext text-base font-normal leading-relaxed'>
                                    {step.description}
                                </p>

                                {/* Decorative corner */}
                                <div className='absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-primary/5 dark:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className='text-center mt-14'
                    data-aos='fade-up'
                    data-aos-delay='500'
                    data-aos-duration='600'>
                    <Link
                        href='/contact'
                        className='btn inline-flex items-center gap-3 cursor-pointer'>
                        Get Started
                        <i
                            className="bg-[url('/images/build-amazing/right-arrow.svg')] bg-no-repeat bg-contain w-4 h-3 inline-block ml-1"
                            aria-hidden
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GetStart

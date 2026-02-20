"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Layout/Header/Logo'
import { useForm } from 'react-hook-form'
import { SignUpFormSchema } from '@/components/schema/SignUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import Swal from 'sweetalert2'
import { signIn } from 'next-auth/react'

// onSubmit={handleSubmit(onSubmit)}
type SignUpFormData = z.infer<typeof SignUpFormSchema>

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(SignUpFormSchema),
    })

    const onSubmit = async (data: SignUpFormData) => {
        Swal.fire({
            title: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        const result = await response.json();
        Swal.close()
        if (result.success) {
            Swal.fire({
                title: 'Success',
                text: result.message,
                icon: 'success',
            })
            await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: true,
                redirectTo: '/',
            })
        }
        else {
            Swal.fire({
                title: 'Error',
                text: result.message,
                icon: 'error',
            })
        }
    }



    const US_STATES = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ]


    return (
        <div className='min-h-dvh w-full flex items-center justify-center'>
            <div className='flex md:flex-row flex-col justify-between items-center max-w-[1920px] mx-auto md:p-10 p-4 gap-10 w-full'>
                <div className='flex flex-col gap-4'>
                    <div className='hidden lg:block lg:w-auto p-8'>
                        <div className='h-full flex flex-col justify-center items-center text-white relative'>
                            <div className='absolute inset-0 opacity-10'>
                                <div className='absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl'></div>
                                <div className='absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl'></div>
                            </div>
                            <div className='relative z-10 max-w-md w-full'>
                                <div className='mb-8'>
                                    <h3 className='text-4xl font-bold mb-3'>Premium Plan</h3>
                                    <p className='text-white/90 text-lg'>Get the most out of your janitorial business</p>
                                </div>

                                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6'>
                                    <div className='flex items-baseline gap-2 mb-4'>
                                        <span className='text-5xl font-bold'>$1560</span>
                                        <span className='text-xl text-white/80'>/month</span>
                                    </div>
                                    <div className='mb-4'>
                                        <span className='text-lg font-semibold text-LightApricot'>$130/lead</span>
                                    </div>
                                    <p className='text-white/90 mb-6 pb-6 border-b border-white/20'>
                                        For growth-focused businesses who want maximum volume
                                    </p>

                                    <ul className='space-y-4'>
                                        <li className='flex items-start gap-3'>
                                            <svg className='w-6 h-6 text-LightApricot shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            <span>12 Appointments / month</span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <svg className='w-6 h-6 text-LightApricot shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            <span>100% Exclusive Appointments</span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <svg className='w-6 h-6 text-LightApricot shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            <span>Phone & Address Verified</span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <svg className='w-6 h-6 text-LightApricot shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            <span>Appointment Fixed With Decision Maker</span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <svg className='w-6 h-6 text-LightApricot shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            <span>Choose your own demography</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1 relative z-10 h-full'>
                    <div className='w-full lg:flex-1 flex items-center justify-center'>
                        <div className='w-full bg-white dark:bg-darklight rounded-2xl shadow-xl dark:shadow-darkmd border border-gray-100 dark:border-dark_border'>
                            {/* Header */}
                            <div className='px-8 pt-8 pb-6 border-b border-gray-200 dark:border-dark_border'>
                                <Logo />
                                <h2 className='text-2xl font-bold text-secondary dark:text-white mt-4 mb-2'>Create Your Account</h2>
                                <p className='text-SlateBlue dark:text-darktext text-sm'>
                                    Join thousands of janitorial companies growing their business
                                </p>
                            </div>

                            {/* Form Section */}
                            <div className='p-4'>
                                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                    <div className='grid md:grid-cols-2 gap-5'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='companyName' className='flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white'>
                                                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                                                </svg>
                                                Company Name
                                            </label>
                                            <input
                                                id='companyName'
                                                type='text'
                                                placeholder='Enter your company name'
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-2 focus:ring-offset-0 ${errors.companyName
                                                    ? 'border-red-400 dark:border-red-600 focus:ring-red-500'
                                                    : 'border-gray-200 dark:border-dark_border focus:border-primary dark:focus:border-lightPrimary focus:ring-primary/20'
                                                    }`}
                                                {...register('companyName')}
                                            />
                                            {errors.companyName && (
                                                <p className='text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1'>
                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                                    </svg>
                                                    {errors.companyName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='email' className='flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white'>
                                                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                                                </svg>
                                                Email Address
                                            </label>
                                            <input
                                                id='email'
                                                type='email'
                                                placeholder='youremail@example.com'
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-2 focus:ring-offset-0 ${errors.email
                                                    ? 'border-red-400 dark:border-red-600 focus:ring-red-500'
                                                    : 'border-gray-200 dark:border-dark_border focus:border-primary dark:focus:border-lightPrimary focus:ring-primary/20'
                                                    }`}
                                                {...register('email')}
                                            />
                                            {errors.email && (
                                                <p className='text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1'>
                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                                    </svg>
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                    <div className='grid md:grid-cols-2 gap-5'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='password' className='flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white'>
                                                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                                </svg>
                                                Password
                                            </label>
                                            <div className='relative'>
                                                <input
                                                    id='password'
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder='Min. 8 characters'
                                                    className={`w-full rounded-xl border-2 px-4 py-3 pr-11 text-sm transition-all duration-200 dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-2 focus:ring-offset-0 ${errors.password
                                                        ? 'border-red-400 dark:border-red-600 focus:ring-red-500'
                                                        : 'border-gray-200 dark:border-dark_border focus:border-primary dark:focus:border-lightPrimary focus:ring-primary/20'
                                                        }`}
                                                    {...register('password')}
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none cursor-pointer mt-[6px]'
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showPassword ? (
                                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                                                        </svg>
                                                    ) : (
                                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className='text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1'>
                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                                    </svg>
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='confirmPassword' className='flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white'>
                                                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                                </svg>
                                                Confirm Password
                                            </label>
                                            <div className='relative'>
                                                <input
                                                    id='confirmPassword'
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder='Re-enter password'
                                                    className={`w-full rounded-xl border-2 px-4 py-3 pr-11 text-sm transition-all duration-200 dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-2 focus:ring-offset-0 ${errors.confirmPassword
                                                        ? 'border-red-400 dark:border-red-600 focus:ring-red-500'
                                                        : 'border-gray-200 dark:border-dark_border focus:border-primary dark:focus:border-lightPrimary focus:ring-primary/20'
                                                        }`}
                                                    {...register('confirmPassword')}
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none cursor-pointer mt-[6px]'
                                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showConfirmPassword ? (
                                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                                                        </svg>
                                                    ) : (
                                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className='text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1'>
                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                                    </svg>
                                                    {errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='grid md:grid-cols-2 gap-5'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='serviceState' className='flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white'>
                                                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                                </svg>
                                                Service State
                                            </label>
                                            <select
                                                id='serviceState'
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 dark:bg-darkmode dark:text-white focus:outline-0 focus:ring-2 focus:ring-offset-0 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")] bg-no-repeat bg-[right_1rem_center] bg-[length:1.5em] ${errors.serviceState
                                                    ? 'border-red-400 dark:border-red-600 focus:ring-red-500'
                                                    : 'border-gray-200 dark:border-dark_border focus:border-primary dark:focus:border-lightPrimary focus:ring-primary/20'
                                                    }`}
                                                {...register('serviceState')}
                                            >
                                                <option value=''>Select your service state</option>
                                                {US_STATES.map((state) => (
                                                    <option key={state} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.serviceState && (
                                                <p className='text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1'>
                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                                    </svg>
                                                    {errors.serviceState.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='cities' className='flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white'>
                                                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                                                </svg>
                                                Service Cities or Zip Codes
                                            </label>
                                            <input
                                                id='cities'
                                                type='text'
                                                placeholder='e.g., New York, Los Angeles, Chicago'
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-2 focus:ring-offset-0 ${errors.cities
                                                    ? 'border-red-400 dark:border-red-600 focus:ring-red-500'
                                                    : 'border-gray-200 dark:border-dark_border focus:border-primary dark:focus:border-lightPrimary focus:ring-primary/20'
                                                    }`}
                                                {...register('cities')}
                                            />
                                            {errors.cities && (
                                                <p className='text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1'>
                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                                    </svg>
                                                    {errors.cities.message}
                                                </p>
                                            )}
                                            <p className='text-xs text-SlateBlue dark:text-darktext flex items-center gap-1'>
                                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                </svg>
                                                Separate multiple cities with commas
                                            </p>
                                        </div>

                                    </div>
                                    <button
                                        type='submit'
                                        className='w-full bg-gradient-to-r from-primary to-lightPrimary text-white px-6 py-3.5 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer'
                                    >
                                        Sign Up
                                    </button>

                                    <div className='text-center pt-4 border-t border-gray-200 dark:border-dark_border'>
                                        <p className='text-sm text-SlateBlue dark:text-darktext'>
                                            Already have an account?{' '}
                                            <Link href='/signin' className='text-primary dark:text-lightPrimary hover:text-secondary dark:hover:text-lightPrimary font-semibold transition-colors duration-200'>
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignupPage
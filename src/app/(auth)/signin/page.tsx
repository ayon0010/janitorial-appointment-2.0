"use client"
import Logo from '@/components/Layout/Header/Logo'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema } from '@/components/schema/LoginSchema'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { z } from 'zod'
import Swal from "sweetalert2"

type LoginFormData = z.infer<typeof LoginFormSchema>

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)

        Swal.fire({
            title: "Please wait...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (result?.error) {
                Swal.fire({
                    title: 'Error',
                    text: "Invalid email or password",
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#1358d8',
                })
            } else if (result?.ok) {
                Swal.fire({
                    title: 'Success',
                    text: 'Login successful',
                    icon: 'success',
                })
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#1358d8',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-AliceBlue dark:bg-darkmode px-4 py-8'>
            <div className='max-w-md w-full mx-auto bg-white dark:bg-darklight p-6 rounded-lg shadow-light_shadwo dark:shadow-darkmd relative z-10 flex flex-col gap-4'>
                <Logo />
                <div>
                    <h2 className='text-xl font-bold text-secondary dark:text-white mb-1'>Sign In</h2>
                    <p className='text-SlateBlue dark:text-darktext text-xs'>
                        Enter your credentials to access your account
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                    <div>
                        <label htmlFor='email' className='block text-xs font-medium text-secondary dark:text-white mb-1.5'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            placeholder='youremail@example.com'
                            className={`w-full rounded-lg border px-3 py-2 text-sm dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-1 ${errors.email
                                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                                : 'border-gray-300 dark:border-dark_border focus:ring-secondary dark:focus:ring-white'
                                }`}
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-xs font-medium text-secondary dark:text-white mb-1.5'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your password'
                                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-1 ${errors.password
                                    ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-dark_border focus:ring-secondary dark:focus:ring-white'
                                    }`}
                                {...register('password')}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none mt-1'
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
                            <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{errors.password.message}</p>
                        )}
                    </div>

                    <div className='flex items-center justify-between'>
                        <Link
                            href='/forgot-password'
                            className='text-xs text-primary dark:text-lightPrimary hover:underline'
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary transition-all duration-0.4s disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm'
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className='text-center text-xs text-SlateBlue dark:text-darktext'>
                        Don't have an account?{' '}
                        <Link href='/signup' className='text-primary dark:text-lightPrimary hover:underline font-medium'>
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
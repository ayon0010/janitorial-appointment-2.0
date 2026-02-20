"use client"
import Logo from '@/components/Layout/Header/Logo'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordSchema } from '@/components/schema/ResetPasswordSchema'
import type { z } from 'zod'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>

export default function ResetPasswordPage() {
    const params = useParams()
    const router = useRouter()
    const token = typeof params?.token === 'string' ? params.token : ''
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(ResetPasswordSchema),
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            setMessage({ type: 'error', text: 'Invalid reset link. Please use the link from your email.' })
            return
        }
        setIsLoading(true)
        setMessage(null)
        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }),
            })
            const json = await res.json()
            if (!res.ok) {
                setMessage({ type: 'error', text: json.message ?? 'Something went wrong. Please try again.' })
                return
            }
            setMessage({ type: 'success', text: json.message ?? 'Password reset. You can now sign in.' })
            setTimeout(() => router.push('/signin'), 2000)
        } catch {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-AliceBlue dark:bg-darkmode px-4 py-8'>
                <div className='max-w-md w-full mx-auto bg-white dark:bg-darklight p-6 rounded-lg shadow-light_shadwo dark:shadow-darkmd text-center'>
                    <Logo />
                    <p className='text-red-600 dark:text-red-400 text-sm mt-4'>Invalid reset link. Please request a new one.</p>
                    <Link href='/forgot-password' className='inline-block mt-4 text-primary dark:text-lightPrimary hover:underline text-sm font-medium'>
                        Request new link
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-AliceBlue dark:bg-darkmode px-4 py-8'>
            <div className='max-w-md w-full mx-auto bg-white dark:bg-darklight p-6 rounded-lg shadow-light_shadwo dark:shadow-darkmd relative z-10 flex flex-col gap-4'>
                <Logo />
                <div>
                    <h2 className='text-xl font-bold text-secondary dark:text-white mb-1'>Reset Password</h2>
                    <p className='text-SlateBlue dark:text-darktext text-xs'>
                        Enter your new password below
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                    {message && (
                        <div
                            className={`px-3 py-2 rounded-lg text-xs ${
                                message.type === 'success'
                                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label htmlFor='password' className='block text-xs font-medium text-secondary dark:text-white mb-1.5'>
                            New Password
                        </label>
                        <div className='relative'>
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Min. 8 characters'
                                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-1 ${
                                    errors.password
                                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-dark_border focus:ring-secondary dark:focus:ring-white'
                                }`}
                                {...register('password')}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-2.5 top-1/2 -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none'
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

                    <div>
                        <label htmlFor='confirmPassword' className='block text-xs font-medium text-secondary dark:text-white mb-1.5'>
                            Confirm Password
                        </label>
                        <div className='relative'>
                            <input
                                id='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Re-enter new password'
                                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-1 ${
                                    errors.confirmPassword
                                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-dark_border focus:ring-secondary dark:focus:ring-white'
                                }`}
                                {...register('confirmPassword')}
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='absolute right-2.5 top-1/2 -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none'
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
                            <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm'
                    >
                        {isLoading ? 'Resetting...' : 'Reset password'}
                    </button>

                    <div className='text-center text-xs text-SlateBlue dark:text-darktext'>
                        <Link href='/signin' className='text-primary dark:text-lightPrimary hover:underline font-medium'>
                            Back to Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

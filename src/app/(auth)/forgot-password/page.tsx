"use client"
import Logo from '@/components/Layout/Header/Logo'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ForgotPasswordSchema } from '@/components/schema/ForgotPasswordSchema'


type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(ForgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        setMessage(null)
        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email }),
            })
            const json = await res.json()
            if (!res.ok) {
                setMessage({ type: 'error', text: json.message ?? 'Something went wrong. Please try again.' })
                return
            }
            setMessage({
                type: 'success',
                text: json.message ?? 'If an account exists for this email, you will receive a password reset link.',
            })
        } catch {
            setMessage({
                type: 'error',
                text: 'Something went wrong. Please try again.',
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
                    <h2 className='text-xl font-bold text-secondary dark:text-white mb-1'>Forgot Password</h2>
                    <p className='text-SlateBlue dark:text-darktext text-xs'>
                        Enter your email and we&apos;ll send you a link to reset your password
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
                        <label htmlFor='email' className='block text-xs font-medium text-secondary dark:text-white mb-1.5'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            placeholder='youremail@example.com'
                            className={`w-full rounded-lg border px-3 py-2 text-sm dark:bg-darkmode dark:text-white dark:placeholder-gray-400 focus:outline-0 focus:ring-1 ${
                                errors.email
                                    ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-dark_border focus:ring-secondary dark:focus:ring-white'
                            }`}
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{errors.email.message}</p>
                        )}
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm'
                    >
                        {isLoading ? 'Sending...' : 'Send reset link'}
                    </button>

                    <div className='text-center text-xs text-SlateBlue dark:text-darktext'>
                        Remember your password?{' '}
                        <Link href='/signin' className='text-primary dark:text-lightPrimary hover:underline font-medium'>
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

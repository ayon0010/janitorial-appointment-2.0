"use client"
import Logo from '@/components/Layout/Header/Logo'
import React from 'react'

export default function SignInPage() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='max-w-473 w-full mx-auto bg-white p-8 rounded-lg relative z-10 flex flex-col gap-6'>
                <Logo />
                <form className='flex flex-col gap-4'>
                    <input type="text" placeholder='Username' className='w-full rounded-lg border border-gray-300 px-4 py-2' />
                    <input type="password" placeholder='Password' className='w-full rounded-lg border border-gray-300 px-4 py-2' />
                    <button type='submit' className='bg-primary text-white px-4 py-2 rounded-lg cursor-pointer'>Sign In</button>
                </form>
            </div>
        </div>
    )
}
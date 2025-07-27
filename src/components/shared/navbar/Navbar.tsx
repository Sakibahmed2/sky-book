/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { getUserInfo } from '@/app/services/authService'
import Container from '@/components/Container'
import Button from '@/components/ui/Button'
import { removeFormLocalStorage } from '@/utils/localStorage'
import { Plane } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [userInfo, setUserInfo] = useState<any>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const user = getUserInfo()
        setUserInfo(user)
    }, [])

    return (
        <Container>
            <div className="flex justify-between items-center h-16 border-b border-zinc-200">
                <div className="flex items-center">
                    <Plane className="h-8 w-8 text-indigo-500" />
                    <span className="ml-2 text-lg
                     md:text-2xl font-semibold text-gray-900">SkyBook</span>
                </div>

                {
                    userInfo && (
                        <div className="text-md text-zinc-700 hidden md:block">
                            Welcome, {userInfo.name || userInfo.email}
                        </div>
                    )
                }

                <nav className="flex space-x-4">

                    {
                        userInfo ? (
                            <Button variant='destructive'
                                onClick={() => removeFormLocalStorage("token")}
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button size='md' variant='outline'>
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register" >
                                    <Button variant='default' size='md'>
                                        Register
                                    </Button>
                                </Link></>
                        )
                    }


                </nav>


            </div>
            {
                userInfo && (
                    <div className="text-md text-zinc-700 block md:hidden text-center">
                        Welcome, {userInfo.name || userInfo.email}
                    </div>
                )
            }
        </Container>
    )
}

export default Navbar
import Container from '@/components/Container'
import Button from '@/components/ui/Button'
import { Plane } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <Container>
            <div className="flex justify-between items-center h-16 border-b border-zinc-200">
                <div className="flex items-center">
                    <Plane className="h-8 w-8 text-indigo-500" />
                    <span className="ml-2 text-2xl font-semibold text-gray-900">SkyBook</span>
                </div>
                <nav className="flex space-x-4">
                    <Link href="/login">
                        <Button size='md' variant='outline'>
                            Login
                        </Button>
                    </Link>
                    <Link href="/register" >
                        <Button variant='default' size='md'>
                            Register
                        </Button>
                    </Link>
                </nav>
            </div>
        </Container>
    )
}

export default Navbar
import Navbar from '@/components/shared/navbar/Navbar'
import { TChildren } from '@/types/global'
import React from 'react'

const CommonLayout = ({ children }: TChildren) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default CommonLayout
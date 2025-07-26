import { TChildren } from '@/types/global'
import React from 'react'

const Container = ({ children }: TChildren) => {
    return (
        <div className='w-full max-w-[1280px] mx-auto px-5'
        >{children}</div >
    )
}

export default Container
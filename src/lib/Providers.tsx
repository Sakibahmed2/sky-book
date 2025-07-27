'use client'

import { store } from '@/redux/store'
import { TChildren } from '@/types/global'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'


const Providers = ({ children }: TChildren) => {
    return (

        <Provider store={store}>
            <Toaster richColors position='top-center' />
            {children}
        </Provider>
    )
}

export default Providers
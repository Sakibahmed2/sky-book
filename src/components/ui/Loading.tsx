import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="
                w-16 h-16 border-4 border-dashed rounded-full
                animate-spin border-blue-500 border-t-transparent
            "></div>
        </div>
    )
}

export default Loading
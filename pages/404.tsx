import TryAgainButton from '@/components/layout/TryAgainButton'
import Head from 'next/head'
import React from 'react'

const error = () => {
    return (
        <>
            <Head>
                <title>Error - Twitter</title>
            </Head>
            <div className='flex items-center justify-center flex-col gap-1 h-full'>
                <h1 className='text-3xl'>Sorry...!</h1>
                <h2 className="text-lg">Something went wrong</h2>
                <TryAgainButton />
            </div>
        </>
    )
}

export default error
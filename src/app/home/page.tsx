"use client"

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
export default function Page() {
    const [query, setQuery] = useState('')
    return (
    <div style={{ height: `calc(100vh - 80px)` }} className="flex flex-col justify-center gap-6">
        <h1 className="font-semibold text-7xl">Welcome to Africa!</h1>
        <div className="flex">
            <div className="bg-lightgray py-3 px-6 gap-16 flex flex-row items-center  text-darkgray rounded-2xl">
                <input value={query} onChange={e => setQuery(e.target.value)} className="font-medium placeholder-darkgray bg-transparent outline-0" placeholder="Find a coach listing" />
                <MagnifyingGlassIcon className='h-6' />
                {/**Change this icon later it looks ugly as fuck */}
            </div>
        </div>
        
    </div>
    )
}
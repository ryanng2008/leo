"use client"

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useUser } from '@/app/context/authContext';
import { Database } from '../lib/types/database.types';
import { fetchPrivateProfile } from '../lib/supabase/get/profile';
export default function Page() {
    const [query, setQuery] = useState('')
    const { user } = useUser();
    const [profile, setProfile] = useState<Database['public']['Tables']['profile']['Row'] | null>(null)
        useEffect(() => {
            fetchPrivateProfile(user?.id || '')
            .then(data => setProfile(data))
        }, [user])
    
    return (
    <div className="flex flex-col my-auto justify-center h-full gap-6">
        <h1 className="font-semibold text-7xl">Welcome, {(user) ? profile?.name ||'user' : 'user'}!</h1>
        <div className="flex">
            <div className="bg-lightgray py-3 px-6 gap-16 flex flex-row items-center  text-darkgray rounded-2xl">
                <input value={query} onChange={e => setQuery(e.target.value)} className="font-medium placeholder-darkgray bg-transparent outline-0" placeholder="Find a coach or tutor" />
                <MagnifyingGlassIcon className='h-6' />
                {/**Change this icon later it looks ugly as fuck */}
            </div>
        </div>
        
    </div>
    )
}
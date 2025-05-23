"use client"

import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useUser } from '@/app/context/authContext'
import { Database } from '../lib/types/database.types'
import { fetchPrivateProfile } from '../lib/supabase/get/profile'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [query, setQuery] = useState('')
    const { user } = useUser()
    const router = useRouter()
    const [profile, setProfile] = useState<Database['public']['Tables']['profile']['Row'] | null>(null)
    
    useEffect(() => {
        fetchPrivateProfile(user?.id || '')
        .then(data => setProfile(data))
    }, [user])

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (query.trim()) {
            router.push(`/home/browse?query=${encodeURIComponent(query)}`)
        }
    }
    
    return (
    <div className="flex flex-col my-auto justify-center h-full gap-6">
        <h1 className="font-semibold text-7xl">{(user) ? "Welcome, " + profile?.name || 'user' : 'Welcome'}!</h1>
        <form onSubmit={handleSearch} className="flex">
            <div className="bg-lightgray py-3 px-6 gap-16 flex flex-row items-center text-darkgray rounded-2xl">
                <input 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                    className="font-medium placeholder-darkgray bg-transparent outline-0" 
                    placeholder="Find a coach or tutor" 
                />
                <button 
                    type="button"
                    onClick={handleSearch}
                    className="cursor-pointer transition-all duration-300 hover:scale-105"
                >
                    <MagnifyingGlassIcon className='h-6 transition-all duration-300'/>
                </button>
            </div>
        </form>
        <div>
        <button 
            onClick={() => router.push('/home/create')}
            className="bg-darkgray flex flex-row gap-4 items-center text-white py-3 px-6 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
        >
            <p>Create a listing</p>
            <ArrowRightIcon className='h-4'/>
        </button>
        </div>
    </div>
    )
}
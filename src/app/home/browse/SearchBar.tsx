'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchBar() {
    const { replace } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const debouncedSearch = useDebouncedCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        if(value) {
            params.set(name, value)
        } else {
            params.delete(name)
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300) // 300ms delay

    return (
        <div className='flex items-end w-full max-w-md gap-2'>
            <input 
                type="text" 
                defaultValue={searchParams.get('q') ?? ''}
                onChange={(e) => debouncedSearch('query', e.target.value)}
                placeholder="Search listings..."
                className='w-full bg-transparent outline-0 border-b-[2px] p-2 text-md border-darkgray' 
            />
            <MagnifyingGlassIcon className='h-8 w-8 my-auto text-darkgray' />
        </div>
    )
} 
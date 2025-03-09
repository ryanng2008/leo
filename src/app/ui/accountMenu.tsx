'use client'
import Script from 'next/script';
import { useUser } from '@/app/context/authContext';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPrivateProfile } from '../lib/supabase/get/profile';
import { Database } from '../lib/types/database.types';

export default function AccountMenu() {
    const { user } = useUser();
    const [profile, setProfile] = useState<Database['public']['Tables']['profile']['Row'] | null>(null)

    useEffect(() => {
        fetchPrivateProfile(user?.id || '')
        .then(data => setProfile(data))
    }, [user])

    return (
        <div>
            {user ? (
                <UserWidget 
                    name={profile?.name || ''} 
                    avatar={profile?.pfp_url || ''} 
                    email={user.user_metadata.email} 
                />
            ) : (
                <GoogleSignIn />
            )}
            <Script 
                src="https://accounts.google.com/gsi/client" 
                strategy="lazyOnload" 
            />
        </div>
    )
}

function UserWidget({ name, email, avatar }: { name: string, email: string, avatar: string }) {
    const { signOut } = useUser();
    const [open, setOpen] = useState(false);
    return (
        <div className='relative'>
            <button className='relative z-10 p-1 w-8 h-8 flex justify-center items-center overflow-clip rounded-full ring-2 ring-offset-2 ring-offset-darkgray ring-gray-300/50' onMouseEnter={() => setOpen(true)}>
            <Image 
            className='object-cover w-full h-full z-[-99]'
            src={avatar || '/fifty.png'} 
            alt={'Avatar'} 
            fill={true}
            
            />
            </button>
            {open &&
            <div className='absolute z-[9999] right-0 top-12 origin-top-right w-fit h-fit rounded-lg bg-white border border-gray-300 text-black flex flex-col py-1 px-1 gap-1' 
                onMouseLeave={() => setOpen(false)}>
                <div className='DETAILS flex flex-col gap-1 py-2 px-3'>
                    <h1 className='NAME whitespace-nowrap text-sm font-medium'>{name}</h1>
                    <h2 className='EMAIL whitespace-nowrap text-xs'>{email}</h2>
                </div>
                <div className='h-px bg-[#dbdbdb] mx-1' />

                <div className='px-2 py-1 flex flex-col gap-1'>
                    <Link
                        href="/home/account" 
                        className='w-full h-full rounded-md px-1 py-1 flex gap-1 justify-start hover:bg-gray-500/20 duration-200 items-center'
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <p className='text-sm text-black'>Settings</p>
                    </Link>
                    <button 
                    className='w-full h-full rounded-md px-1 py-1 flex gap-1 justify-start hover:bg-red-500/20 duration-200 items-center'
                    onClick={signOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-4 stroke-danger">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        <p className='text-sm text-danger'>Log out</p>
                    </button>
                </div>
            </div>}
        </div>
    )
}

function GoogleSignIn() {
    return (
    <><div 
    id="g_id_onload" data-client_id="142861446606-8p5cj0nc5gunegct8332852598pkosri.apps.googleusercontent.com"
    data-context="signin" data-ux_mode="popup" data-callback="handleSignInWithGoogle"
    data-auto_prompt="false" data-use_fedcm_for_prompt="true" nonce="c_lBOKfLdog8dzYQQx-baQ">
    </div>
    <div 
    className="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="outline" 
    data-text="signin_with"data-size="large" data-locale="en" data-logo_alignment="left"></div></>)
}
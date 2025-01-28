'use client'
import Script from 'next/script';
import { useUser } from '@/app/context/authContext';
import Image from 'next/image'
import { useState } from 'react';

export default function AccountMenu() {
    const { user } = useUser();
    return (
        <div>
            {
                (user) 
                ? 
                <UserWidget 
                    name={user.user_metadata.name} 
                    avatar={user.user_metadata.picture} 
                    email={user.user_metadata.email} />
                :
                <GoogleSignIn />
            }
            <Script 
                src="https://accounts.google.com/gsi/client" 
                strategy="lazyOnload" />
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
                <div className='px-2 py-1'>
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
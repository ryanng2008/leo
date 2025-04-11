'use client'

import { useState } from "react";
import { createListing } from "@/app/lib/supabase/set/listing";
import { ListingInsertInput } from "@/app/lib/supabase/set/listing";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/authContext";
import Script from 'next/script';

import { Details, Tags, AboutBullets, AttachImages } from "@/app/home/create/components";

interface DetailsType {
    location: string;
    rate: string;
    duration: string;
}

function GoogleSignIn() {
    return (
        <>
            <div 
                id="g_id_onload"
                data-client_id="142861446606-8p5cj0nc5gunegct8332852598pkosri.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleSignInWithGoogle"
                data-auto_prompt="false"
                data-use_fedcm_for_prompt="true"
                nonce="c_lBOKfLdog8dzYQQx-baQ">
            </div>
            <div 
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-locale="en"
                data-logo_alignment="left">
            </div>
        </>
    )
}

export default function Page() {
    const router = useRouter();
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState<DetailsType>({
        location: '',
        rate: '',
        duration: ''
    });
    const [bullets, setBullets] = useState(['']);
    const [tags, setTags] = useState<string[]>([]);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [message, setMessage] = useState('');

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
                <h1 className="text-2xl font-semibold">Sign in to create a listing</h1>
                <GoogleSignIn />
                <Script 
                    src="https://accounts.google.com/gsi/client" 
                    strategy="lazyOnload" 
                    nonce="c_lBOKfLdog8dzYQQx-baQ"
                />
            </div>
        );
    }

    async function handleCreate() {
        const listing: ListingInsertInput = {
            title: title,
            description: description,
            details: [details.location, details.rate, details.duration],
            tags: tags,
            creds_bullets: bullets,
        }
        const result = await createListing(listing);
        if(result.success) {
            setSuccess(true);
            setMessage('Success!')
            router.push(`/home/browse/${result.id}`)
        } else {
            setSuccess(false);
            setMessage(result.message)
        }
    }
    return (
        <>
        {
        success ?
        <div className="flex justify-center items-center text-xl">{message}</div> :
        <div className="my-12 flex flex-col mx-8 gap-12">
        <h1 className="font-semibold text-5xl">Create a listing</h1>
        <div className="flex flex-col md:grid grid-cols-2 gap-20">
            <div className="space-y-6">
                <div className="LISTING NAME flex flex-col gap-1">
                    <h2 className="font-semibold text-xl">Listing title</h2>
                    <input 
                    type="text" 
                    className="border border-gray-400 rounded-lg py-[6px] px-3 text-md outline-gray-400 outline-2"
                    placeholder="Tennis lessons with Yannick"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="DESCRIPTION flex flex-col gap-1">
                    <h2 className="font-semibold text-lg">Description</h2>
                    <textarea 
                    className="border border-gray-400 rounded-lg py-2 px-3 text-sm outline-gray-400 outline-2 min-h-[100px]"
                    value={description}
                    placeholder="I can teach you everything and nothing at the same time!"
                    onChange={e => setDescription(e.target.value)}/>
                </div>
                <Tags tags={tags} setTags={setTags}/>
                <AttachImages />
            </div>
            <div className="space-y-8">
                <Details details={details} setDetails={setDetails}/>
                <AboutBullets bullets={bullets} setBullets={setBullets}/>
            </div>
        </div>
        <div className="flex gap-4 items-center">
            <button 
            className="bg-darkgray rounded-lg py-2 px-5 text-md text-white font-semibold shadow-xl hover:scale-[102%] duration-300"
            onClick={async () => handleCreate()}>Create</button>
            <p>{message}</p>
        </div>
        </div>
        }
        </>
    )
}




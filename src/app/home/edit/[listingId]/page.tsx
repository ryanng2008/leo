'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getListing } from "@/app/lib/supabase/get/listing";
import { updateListing } from "@/app/lib/supabase/set/listing";
import { fetchUserId } from "@/app/lib/supabase/auth/user";
import { ListingUpdate } from "@/app/lib/supabase/set/listing";

// Import the components from create page
import { Details, Tags, AboutBullets, AttachImages } from "@/app/home/create/components";

interface DetailsType {
    location: string;
    rate: string;
    duration: string;
}

export default function EditListingPage({ 
    params 
}: { 
    params: Promise<{ listingId: string }> 
}) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState<DetailsType>({
        location: '',
        rate: '',
        duration: ''
    });
    const [bullets, setBullets] = useState(['']);
    const [tags, setTags] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        async function checkAuthAndLoadListing() {
            const userId = await fetchUserId();
            const listingId = (await params).listingId;
            const listing = await getListing(listingId);

            if (!listing || !userId || listing.providerid !== userId) {
                setIsAuthorized(false);
                setIsLoading(false);
                return;
            }

            setIsAuthorized(true);
            setTitle(listing.title);
            setDescription(listing.description || '');
            setDetails({
                location: listing.details?.[0] || '',
                rate: listing.details?.[1] || '',
                duration: listing.details?.[2] || ''
            });
            setBullets(listing.creds_bullets || ['']);
            setTags(listing.tags || []);
            setIsLoading(false);
        }

        checkAuthAndLoadListing();
    }, [params]);

    async function handleUpdate() {
        const listing: ListingUpdate = {
            title,
            description,
            details: [details.location, details.rate, details.duration],
            tags,
            creds_bullets: bullets,
        };
        const listingId = (await params).listingId;
        const result = await updateListing(listingId, listing);
        
        if (result.success) {
            setMessage('Updated successfully!');
            router.push(`/home/browse/${listingId}`);
        } else {
            setMessage(result.message);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        return <div>Not authorized to edit this listing</div>;
    }

    return (
        <div className="my-12 flex flex-col mx-8 gap-12">
            <h1 className="font-semibold text-5xl">Edit listing</h1>
            <div className="flex flex-col md:grid grid-cols-2 gap-20">
                <div className="space-y-6">
                    <div className="LISTING NAME flex flex-col gap-1">
                        <h2 className="font-semibold text-xl">Listing title</h2>
                        <input 
                            type="text" 
                            className="border border-gray-400 rounded-lg py-[6px] px-3 text-md outline-gray-400 outline-2"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="DESCRIPTION flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Description</h2>
                        <textarea 
                            className="border border-gray-400 rounded-lg py-2 px-3 text-sm outline-gray-400 outline-2 min-h-[100px]"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
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
                    onClick={handleUpdate}
                >
                    Save Changes
                </button>
                <p>{message}</p>
            </div>
        </div>
    );
} 
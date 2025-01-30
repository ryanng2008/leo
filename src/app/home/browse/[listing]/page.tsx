import { getListing } from "@/app/lib/supabase/get/listing";
import { CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";


// import { useState } from "react";

export default async function Listing({
    params,
  }: {
    params: Promise<{ listing: string }>
  }) {
    const listingId = (await params).listing[0];
    const listing = await getListing(listingId);
    // console.log((await params).listing[0])
    // const listingId = (await params).listing[0];
    // const listing = await getListingById(listingId);
    // handle listing null case
    // if(!listing) {
    //     return <div>Not Available</div>
    // }

    // Reimplement fetch with regular supabase
    if(!listing) {
        return <div className="mx-auto">Page not found</div>
    }
    return (
        <div className="my-16 grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <h1 className="font-bold text-4xl">{listing.title}</h1>
                    <p className="text-xl">{listing.profile.name}</p>
                </div>
                <div>
                    <p className="text-sm whitespace-pre-wrap">{listing.description}</p>
                </div>
                <div className="space-y-4">
                    <h1 className="font-semibold text-2xl">Details</h1>
                    <div className="flex gap-4 items-center">
                        <MapPinIcon className="h-8" />
                        <p>{listing.details![0] || ''}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <CurrencyDollarIcon className="h-8" />
                        <p>{listing.details![1] || ''}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <ClockIcon className="h-8" />
                        <p>{listing.details![2] || ''}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="font-semibold text-2xl">About {listing.profile.name}</h1>
                    <ul className="list-disc list-inside text-sm">
                        {listing.creds_bullets?.map((b, i)=> <li key={i}>{b}</li>)}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col ">
                
                <div>Reviews gallery</div>
            </div>
        </div>
    )
}

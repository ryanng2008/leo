import { getListing } from "@/app/lib/supabase/get/listing";
import { CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


// import { useState } from "react";

export default async function Listing({
    params,
  }: {
    params: Promise<{ listing: string }>
  }) {
    const listingId = (await params).listing;
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
        <div className=" flex flex-col md:grid grid-cols-2 gap-12 my-[80px]">
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold text-4xl">{listing.title}</h1>
                    <Link href={`/home/edit/${listing.id}`}>
                        <PencilIcon className="h-6" />
                    </Link>
                    </div>
                    <p className="text-lg">{listing.profile.name}</p>
                </div>
                <div>
                    <p className="text-sm whitespace-pre-wrap">{listing.description}</p>
                </div>
                <div className="space-y-3">
                    <h1 className="font-semibold text-xl">Details</h1>
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
            <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
                <div className="border-gray-200 border-2 flex justify-center items-center rounded-md h-[300px]">
                    Image gallery - coming soon!
                </div>
            </div>
            {/* <div className="REVIEWS flex flex-col gap-2">
                <h2 className="font-semibold text-xl">Reviews</h2>
                <div className="border-gray-200 border-2 flex justify-center items-center rounded-md h-[100px]">
                    Coming soon!
                </div>
            </div> */}
            </div>
        </div>
    )
}

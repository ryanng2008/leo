import { CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { getListingById } from "@/app/lib/db/listing";

// import { useState } from "react";

export default async function Listing({
    params,
  }: {
    params: Promise<{ listing: string }>
  }) {
    console.log((await params).listing[0])
    const listingId = (await params).listing[0];
    const listing = await getListingById(listingId);
    // handle listing null case
    if(!listing) {
        return <div>Not Available</div>
    }
    return (
        <div className="my-16 grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <h1 className="font-bold text-4xl">{listing.title}</h1>
                    <p className="text-xl">Leonardo Martinello</p>
                </div>
                <div>
                    <p className="text-sm">Cook cookies, not meth. DEA meanies catch bad guys. Gus Fring chicken man. Breaking Bad no good. Albuquerque hot place. Methylamine is a yucky chemical. RV is a car, not a house. Crystal pretty but bad. Money is for buying cookies, not breaking laws. Friends and family good, bad guys bad</p>
                </div>
                <div className="space-y-4">
                    <h1 className="font-semibold text-2xl">Details</h1>
                    <div className="flex gap-4 items-center">
                        <MapPinIcon className="h-8" />
                        <p>Tijuana, Mexico</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <CurrencyDollarIcon className="h-8" />
                        <p>$50-$10000</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="font-semibold text-2xl">About Leonardo</h1>
                    <ul className="list-disc list-inside text-sm">
                        <li>Pulled up in a Beamer I was flexing</li>
                        <li>Poured a cup of Wok cuz I was stressing</li>
                        <li>Put on all my ice now I feel so cool</li>
                    </ul>
                    <p className="text-sm">Von-ipsum dolor sit da block, you know how it go. Streets be wild, opps be mad, and shorties steady tweakin. Aint no cappin, we out here stackin, catchin bands and chasin dreams. Real ones gon relate, fake ones gon hate, but thats just how the game play out. Hundred nights, hundred fights, still I rise up from the trenches. Keep it hunnid, keep it real, thats the only way I feel. You hear me? Yeah, you hear me. Thats on everything.</p>
                </div>
            </div>
            <div className="flex flex-col ">
                
                <div>Reviews gallery</div>
            </div>
        </div>
    )
}

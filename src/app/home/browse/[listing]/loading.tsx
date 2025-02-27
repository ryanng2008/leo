import { CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/solid";


// This will be ur skeleton
export default function Loading() {
    return (
        <div className="my-16 grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <h1 className="font-bold text-4xl">Loading...</h1>
                    <p className="text-xl">Loading...</p>
                </div>
                <div>
                    <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="space-y-4">
                    <h1 className="font-semibold text-2xl">Details</h1>
                    <div className="flex gap-4 items-center">
                        <MapPinIcon className="h-8" />
                        <p>...</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <CurrencyDollarIcon className="h-8" />
                        <p>...</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="font-semibold text-2xl">About Leonardo</h1>
                    <ul className="list-disc list-inside text-sm">
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                    </ul>
                    <p className="text-sm">...</p>
                </div>
            </div>
            <div className="flex flex-col ">
                
                <div>Reviews gallery</div>
            </div>
        </div>
    )
}
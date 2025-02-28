
import ListingItem from '@/app/home/browse/listingItem';
import { getListingsWithProvider } from '@/app/lib/supabase/get/listing';
// import prisma from '@/app/lib/db';

export default async function Page() {
    // const listings = await prisma.listing.findMany();
    // const listingItemsReal = listings.map((listing) => {
    //     // get provider name from provider id
    //     // render ListingItem
    // })
    const listings = await getListingsWithProvider();
    const dummyListings = listings.map((l) => {
        return <ListingItem 
            key={l.id}
            id={l.id}
            title={l.title}
            providerName={l.profile.name || ''}
            tags={l.tags || []}
            location={l.details![0] || ''}
        />
    })
    
    return (
        <div className='grow'>
        <div className="my-12 flex flex-col md:mx-8">
            <div className="ACTION BA.R mb-8">
                <div className='flex justify-end mx-4 gap-4'>
                    {/* <div className={`flex items-end transition-all duration-300 overflow-hidden ${!showSearch && 'w-0'}`}>
                    <input type="text" className='bg-transparent outline-0 border-b-2 p-0 text-lg border-darkgray' />
                    </div>
                    <button onClick={() => setShowSearch(!showSearch)}>
                        <MagnifyingGlassIcon className='h-10' />
                    </button> */}
                </div>
                
            </div>
            <div className="md:grid grid-cols-2 flex flex-col gap-8">
                {dummyListings}
            </div>
        </div>
        </div>
    )
}

// function ListingItem({ title, creator, location, rating, image='', tags}: { title: string, creator: string, location: string, rating: number | string, image: string, tags: string[] }) {
//     return (
//         <div className="bg-lightgray rounded-2xl drop-shadow-xl grid grid-cols-4 px-8 py-6">
//             <div className="col-span-3 flex flex-col gap-2">
//                 <h1 className='font-semibold text-3xl'>{title}</h1>
//                 <div className='DETAILS flex flex-row gap-4 text-sm mx-1'>
//                     <p>{creator}</p>
//                     <div className='h-[2px] w-[2px] rounded-full my-auto bg-darkgray' />
//                     <p>{location}</p>
//                     {false && rating}
//                 </div>
//                 <ul className='TAGS flex flex-wrap gap-2 my-1'>
//                     {tags.map((tag, i) => {
//                         return <li key={i} className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>{tag}</li>
//                     })}
//                 </ul>
//             </div>
//             <div className='overflow-hidden rounded-lg'>
//                 <Image src={image} height={144} width={144} alt="50 bomb" />
//             </div>
//         </div>
//     )
// }
"use client"
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useState } from 'react';
// import clsx from 'clsx'

export default function Page() {
    // const Tag = ({ text }: { text: string }) => {
    //     return (
    //         <div className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>{text}</div>
    //     )
    // }
    const [showSearch, setShowSearch] = useState(false);
    return (
        <div className="my-12 flex flex-col mx-8">
            <div className="ACTION BA.R mb-8">
                <div className='flex justify-end mx-4 gap-4'>
                    <div className={`flex items-end transition-all duration-300 overflow-hidden ${!showSearch && 'w-0'}`}>
                    <input type="text" className='bg-transparent outline-0 border-b-2 p-0 text-lg border-darkgray' />
                    </div>
                    <button onClick={() => setShowSearch(!showSearch)}>
                        <MagnifyingGlassIcon className='h-10' />
                    </button>
                </div>
                
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-lightgray rounded-2xl drop-shadow-xl grid grid-cols-4 px-8 py-6">
                    <div className="col-span-3 flex flex-col gap-2">
                        <h1 className='font-semibold text-3xl'>Tennis for Beginners</h1>
                        <div className='DETAILS flex flex-row gap-4 text-sm mx-1'>
                            <p>Leonardo Martinello</p>
                            <div className='h-[2px] w-[2px] rounded-full my-auto bg-darkgray' />
                            <p>San Jose, CA</p>
                        </div>
                        <div className='TAGS flex flex-wrap gap-2 my-1'>
                        <div className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>50 piece</div>
                        <div className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>malachi</div>
                        <div className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>flynn</div>
                        </div>
                    </div>
                    <div className='overflow-hidden rounded-lg'>
                        <Image src="/fifty.png" height={144} width={144} alt="50 bomb" />
                    </div>

                </div>
                <div className="bg-lightgray rounded-2xl drop-shadow-xl grid grid-cols-4 px-8 py-6">
                    <div className="col-span-3 flex flex-col gap-2">
                        <h1 className='font-semibold text-3xl'>Tennis for Beginners</h1>
                        <div className='DETAILS flex flex-row gap-4 text-sm mx-1'>
                            <p>Leonardo Martinello</p>
                            <div className='h-[2px] w-[2px] rounded-full my-auto bg-darkgray' />
                            <p>San Jose, CA</p>
                        </div>
                        <div className='TAGS flex flex-wrap gap-2 my-1'>
                        <div className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>50 piece</div>
                        <div className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>malachi</div>
                        <div className='py-1 px-4 rounded-full text-xs bg-darkgray text-white'>flynn</div>
                        </div>
                    </div>
                    <div className='overflow-hidden rounded-lg'>
                        <Image src="/fifty.png" height={144} width={144} alt="50 bomb" />
                    </div>

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
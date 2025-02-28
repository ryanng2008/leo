// import Image from 'next/image';
import Link from 'next/link';

interface ListingProps {
    id: string | number,
    title: string,
    providerName: string,
    location: string,
    tags: string[],
    imageLink?: string
}

export default function ListingItem({ id, title, providerName, location, tags, /*imageLink='/fifty.png' */}: ListingProps) {
    return (
        <div>
        <Link href={`/home/browse/${id}`} className="bg-lightgray rounded-2xl shadow-lg flex flex-row justify-between md:grid grid-cols-4 px-8 py-6 outline-gray-500/15 hover:outline-gray-500/30 outline-2 outline hover:scale-[100.5%] duration-100">
            <div className="col-span-4 flex flex-col gap-2">
                <h1 className='font-semibold md:text-2xl text-lg'>{title}</h1>
                <div className='DETAILS flex flex-row gap-4 text-sm mx-1'>
                    <p className='md:text-sm text-xs'>{providerName}</p>
                    <div className='h-[2px] w-[2px] rounded-full my-auto bg-darkgray' />
                    <p className='md:text-sm text-xs'>{location}</p>
                </div>
                <div className='TAGS flex flex-wrap gap-2 my-2'>
                    {tags.map((t, i) => {
                        return <div key={i} className='py-1 px-4 rounded-full text-xs bg-darkgray text-white shadow-sm'>{t}</div>
                    })}
                </div>
            </div>
            {/* <div className='overflow-hidden md:inline hidden rounded-lg'>
                <Image src={imageLink} height={144} width={144} alt="50 bomb" />
            </div> */}
        </Link>
        </div>
    )
}
'use client'
import { CurrencyDollarIcon, /*InformationCircleIcon,*/ MapPinIcon, MinusCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createListing } from "@/app/lib/supabase/set/listing";
import { ListingInsertInput } from "@/app/lib/supabase/set/listing";
import { useRouter } from "next/navigation";


interface DetailsType {
    location: string,
    rate: string,
    duration: string,
    // [detail: string]: string
}


export default function Page() {
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
    const [success, setSuccess] = useState<boolean | null>(null);
    const [message, setMessage] = useState('');
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
                    placeholder="Freeloading lessons with Yannick"
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

function AttachImages() {
    return (
        <div className="ATTACH IMAGES flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Attach images</h2>
            <div className="border-gray-200 border-2 flex justify-center items-center rounded-md h-[100px]">
                Coming soon!
            </div>
        </div>
    )
}

// { tags, setTags }: { tags: string[], setTags: (tags: string[]) => void}
function Tags({ tags, setTags }: { tags: string[], setTags: (tags: string[]) => void}) {
    const [tagsInput, setTagsInput] = useState('')
    const handleAddItem = () => {
        if (tagsInput.trim() !== '') {
            setTags([...tags, tagsInput]);
            setTagsInput(''); 
        }
    };
    return (
    <div className="TAGS flex flex-col gap-4">
        <h2 className="font-semibold text-xl">Tags</h2>
        <div className="flex flex-col gap-6 mb-8">
            <input 
            type="text" 
            className="border rounded-lg border-gray-400 outline-none px-3 py-1 text-sm w-[60%]"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="Type your tags here"
            onKeyDown={e => { if(e.key === 'Enter') handleAddItem() }}  />
            <div className="border-gray-400 border-2 shadow-xl rounded-2xl py-4 px-6 flex flex-row gap-2 flex-wrap min-h-[70px]">
                {tags.map((tag, i) => {
                    return (
                    <div key={i} className='py-1 px-4 rounded-full text-xs bg-darkgray text-white shadow-sm flex flex-row items-center gap-2'>
                    <p>{tag}</p>
                    <XMarkIcon className="h-3" onClick={() => setTags(tags.filter((_t, index) => index !== i))} />
                    </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

function AboutBullets({ bullets, setBullets }: { bullets: string[], setBullets: (bullets: string[]) => void}) {
    function handleAddBullet() {
        setBullets([
            ...bullets,
            ''
        ])
    }
    function handleDeleteBullet(index: number) {
        // handle len 1
        setBullets(bullets.filter((_b, i) => i !== index))
    }
    function handleChangeBullet(index: number, value: string) {
        setBullets(bullets.map((b, i) => i === index ? value : b))
    }

    const bulletsElements = bullets.map((bullet, i) => {
        return (
            <li className="flex items-center gap-4" key={i}>
                <div className="rounded-full w-[5px] h-[5px] bg-black"/>
                <input  
                    type="text"
                    className="border border-gray-500 rounded-md outline-none py-1 px-2 min-w-[400px]" 
                    value={bullet} 
                    onChange={e => handleChangeBullet(i, e.target.value)} 
                    placeholder={i === 0 ? 'Add your contact details here' : 'Info about you'}/>
                <MinusCircleIcon className="text-darkgray h-6" onClick={() => handleDeleteBullet(i)}/>
            </li>
        )
    })
    return (
        <div className="ABOUT flex flex-col gap-3">
            <h2 className="font-semibold text-xl">About/Extra</h2>
            <ul className="flex flex-col gap-2">
                {bulletsElements}
            </ul>
            <div className="flex items-center gap-4">
                <button onClick={handleAddBullet} className="ml-[21px] min-w-[400px] bg-darkgray text-white py-1 shadow-xl rounded-lg">
                    <PlusIcon className="h-5  mx-auto" />
                </button>
            </div>
        </div>
    )
}


function Details({ details, setDetails }: { details: DetailsType, setDetails: (details: DetailsType) => void}) {

    // const otherDetails = ['item1', 'item2', 'item3']
    // 2 state variables: for normal (loc, rate, duration) + for unconventional

    // TODO
    // - add the custom fields (plus icon)
    // - better styling
    // - make the input shrink before the icons
    function handleChangeNormal(e: React.ChangeEvent<HTMLInputElement>) {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="DETAILS flex flex-col gap-3">
            <h2 className="font-semibold text-2xl">Details</h2>
            <div className="flex">
            <div className="border-gray-400 border-2 rounded-3xl flex flex-col py-4 px-6 gap-4 min-w-[65%] overflow-clip shadow-xl">
                <div className="flex gap-4">
                    <MapPinIcon className="h-8 text-darkgray" />
                    <input type="text" 
                    className="text-sm bg-transparent border-b border-black outline-transparent placeholder:text-gray-600/70 grow" 
                    placeholder="Hong Kong"
                    name='location'
                    value={details.location}
                    onChange={handleChangeNormal}
                    />
                </div>
                <div className="flex gap-4">
                    <CurrencyDollarIcon className="h-8 text-darkgray"/>
                    <input type="text" 
                    className="text-sm bg-transparent border-b border-black outline-transparent placeholder:text-gray-600/70 grow" 
                    placeholder="49 USD/hr"
                    name='rate'
                    value={details.rate}
                    onChange={handleChangeNormal}
                    />
                </div>
                <div className="flex gap-4">
                    <ClockIcon className="h-8 text-darkgray"/>
                    <input type="text" 
                    className="text-sm bg-transparent border-b border-black outline-transparent placeholder:text-gray-600/70 grow" 
                    placeholder="120 mins"
                    name='duration'
                    value={details.duration}
                    onChange={handleChangeNormal}
                    />
                </div>
                {/* <div className="flex gap-2">
                    <InformationCircleIcon className="h-8 text-darkgray"/>
                    <input type="text" 
                    className="bg-transparent border-b border-black outline-transparent placeholder:text-gray-600/70 grow" 
                    placeholder="120 mins"/>
                </div> */}
            </div>
            </div>
        </div>
    )
}


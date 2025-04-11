'use client'

import { useState, useRef } from 'react';
import Image from 'next/image';
import { 
    CurrencyDollarIcon, 
    MapPinIcon, 
    MinusCircleIcon, 
    PlusIcon, 
    XMarkIcon 
} from "@heroicons/react/24/solid"
import { ClockIcon } from "@heroicons/react/24/outline"

export interface DetailsType {
    location: string;
    rate: string;
    duration: string;
}

export function AttachImages() {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (files: File[]) => {
        if (files.length + images.length > 5) {
            alert('Maximum 5 images allowed');
            return;
        }

        setImages(prev => [...prev, ...files]);
        
        // Create preview URLs
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type.startsWith('image/')
        );
        
        if (files.length > 0) {
            handleImageSelect(files);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="ATTACH IMAGES flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Attach images</h2>
            <div 
                className={`border-2 flex justify-center items-center rounded-md h-[100px] transition-colors duration-200 ${
                    isDragging 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                }}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Click to upload images (max 5)
                    </button>
                    <p className="text-sm text-gray-400 mt-1">or drag and drop images here</p>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageSelect(Array.from(e.target.files || []))}
                    accept="image/*"
                    multiple
                    className="hidden"
                />
            </div>
            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square">
                            <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover rounded-md"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// { tags, setTags }: { tags: string[], setTags: (tags: string[]) => void}
export function Tags({ tags, setTags }: { tags: string[], setTags: (tags: string[]) => void}) {
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

export function AboutBullets({ bullets, setBullets }: { bullets: string[], setBullets: (bullets: string[]) => void}) {
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


export function Details({ details, setDetails }: { details: DetailsType, setDetails: (details: DetailsType) => void}) {

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
                    placeholder="Sheung Wan/Online"
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


'use client'
import Image from "next/image";

// https://nextjs.org/docs/pages/building-your-application/optimizing/images
// "What if I don't know the size of the images?"

export function ImageGallery({ images }: { images: string[] }) {
    // const gallery = ['fgkhdfkgf', 'fgkhdfkgf', 'fgkhdfkgf', 'fgkhdfkgf']
    // const [galleryIndex, setGalleryIndex] = useState(0);
    // const currentImg = gallery[galleryIndex];
    // function handlePrev() {
    //     setGalleryIndex(i => (i - 1) % gallery.length)
    // }
    // function handleNext() {
    //     setGalleryIndex(i => (i - 1) % gallery.length)
    // }
    return (
        <div className="min-h-[250px] mx-auto items-center flex flex-col gap-4">
            <div className="h-[250px] w-[250px] object-contain">
            <Image height={250} width={250} alt="flynnn" src="/fifty.png"></Image>
            </div>
            <div className="flex justify-center gap-4">
                <button>Prev</button>
                <button>Next</button>
            </div>
            Arinjoy u gotta help me w this one bro
        </div>
    )
}
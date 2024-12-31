import Link from "next/link";

export default function Navbar() {
    return (
        <div className="bg-darkgray text-white grid grid-cols-3 h-[80px] px-16">
            <Link href='/home' className="icon text-3xl font-bold my-auto">Hi</Link>
            <div className="grid grid-cols-2 my-auto"> 
                <div className="">
                    <Link href='/home/explore' className="hover:underline"><p>Explore listings</p></Link>
                </div>
                <div>
                    <Link href='/home/create' className="hover:underline">Create a listing</Link>
                </div>
            </div>
            <div className="flex flex-row justify-end my-auto gap-4">
                <Link href='/home/account' className="py-2 px-6 font-semibold">Log in</Link>
                {/* Use url params to specify login/register here, possibly */}
                <Link href='' className="py-2 px-6 text-darkgray font-semibold bg-white rounded-3xl">Sign up</Link>
            </div>
        </div>
    )
}
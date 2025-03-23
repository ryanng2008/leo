'use client'
// this page for login and register 

import { useUser } from "@/app/context/authContext";
import { fetchPrivateProfile } from "@/app/lib/supabase/get/profile";
import { updatePrivateProfile } from "@/app/lib/supabase/set/profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMyListings } from "@/app/lib/supabase/get/listing";

interface Listing {
  id: number;
  title: string;
  details: string[] | null;
  createdat: string;
  description: string | null;
}

function MyListings({ userId }: { userId: string }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      const data = await getMyListings(userId);
      setListings(data);
      setIsLoading(false);
    }

    loadListings();
  }, [userId]);

  if (isLoading) return <div>Loading your listings...</div>;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-medium">My Listings</h2>
      {listings.length === 0 ? (
        <p className="text-gray-500">No listings yet</p>
      ) : (
        <div className="grid gap-4">
          {listings.map((listing) => (
            <Link 
              href={`/home/browse/${listing.id}`} 
              key={listing.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{listing.title}</h3>
                  <div className="flex flex-row gap-2 text-sm text-gray-500">
                    <p>{listing.details?.[0]}</p>
                    {listing.details?.[0] && listing.description && <div className="w-[2px] h-[2px] rounded-full bg-gray-500 m-auto" />}
                    <p>{listing.description && 
                      (listing.description.length > 32 
                        ? listing.description.slice(0, 29) + '...'
                        : listing.description
                      )
                    }</p>
                  </div>
                </div>
                
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  // const supabase = await createServerClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // console.log(user);
  
  // if(!profile) {
  //   return (
  //     <div className="mx-8 my-12">
  //       Profile doesn&apos;t exist
  //     </div>
  //   )
  // } 
  const router = useRouter();
  const { user } = useUser();
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetchPrivateProfile(user?.id || '')
    .then(data => {
      if(!data) {
        return
      }
      setName(data.name || '')
    })
  }, [user])
  if(!user?.id) {
    return <div className="my-auto mx-auto">Profile does not exist</div>
  }
  async function handleSubmit() {
    const updated = { name: name }
    const update = await updatePrivateProfile(updated);
    if(update.success) {
      setSuccess(true);
      setMessage('Success!')
      router.push('/home')
    } else {
      setMessage('an error occurred')
    }
  }
  return (
    <div className="flex flex-col mx-8 gap-12 my-12">
    <h1 className="text-6xl font-semibold">Account</h1>

    <div className="md:grid grid-cols-2 flex flex-col gap-12">
      { success ? <div className="my-auto mx-auto">{message}</div> :
      <>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-medium">Name</h2>
            <input type="text" 
              className="border-gray-300 border-2 rounded-lg py-1 px-2 outline-none" 
              value={name} 
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="button flex">
            <div className="w-full" />
            <button 
              className="bg-darkgray text-white font-semibold py-1 px-6 rounded-xl text-lg" 
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          {message && <div className="text-right">
            <p>{message}</p>
          </div>}
        </div>
        <div>
          {user && <MyListings userId={user.id} />}
        </div>
      </>}
    </div>
    </div>
  )
}


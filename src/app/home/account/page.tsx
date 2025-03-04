'use client'
// this page for login and register 

import { useUser } from "@/app/context/authContext";
import { fetchPrivateProfile } from "@/app/lib/supabase/get/profile";
import { updatePrivateProfile } from "@/app/lib/supabase/set/profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


// import { createServerClient } from "@/app/lib/supabase/clients/server";

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
    <div className="mx-8 md:grid grid-cols-2 flex flex-col my-12">
      { success ? <div className="my-auto mx-auto">{message}</div> :
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl font-semibold">Account</h1>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-medium">Name</h2>
          <input type="text" 
          className="border-gray-300 border-2 rounded-lg py-1 px-2 outline-none" 
          value={name} 
          onChange={e => setName(e.target.value)}/>
        </div>
        <div className="button flex">
          <div className="w-full" />
          <button className="bg-darkgray text-white font-semibold py-1 px-6 rounded-xl text-lg bg-" onClick={handleSubmit}>Save </button>
        </div>
        {message && <div className=" text-right">
          <p>{message}</p>
        </div>}
      </div>}
    </div>
  )
}


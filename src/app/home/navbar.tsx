import Link from "next/link";
import AccountMenu from "@/app/ui/accountMenu";
// import { createClient } from '@/app/lib/supabase/server';

export default async function Navbar() {
    // const supabase = await createClient();
    // // supabase.auth.signInWithOAuth({
    // //     provider: 'google',
    // //   })
    
    // function GoogleSignIn() {
    //     return (
    //     <><div 
    //     id="g_id_onload"
    //     data-client_id="142861446606-8p5cj0nc5gunegct8332852598pkosri.apps.googleusercontent.com"
    //     data-context="signin"
    //     data-ux_mode="popup"
    //     data-callback="handleSignInWithGoogle"
    //     data-auto_prompt="false"
    //     data-use_fedcm_for_prompt="true"
    //     nonce="c_lBOKfLdog8dzYQQx-baQ"></div>
    //     <div 
    //     className="g_id_signin"
    //     data-type="standard"
    //     data-shape="rectangular"
    //     data-theme="outline"
    //     data-text="signin_with"
    //     data-size="large"
    //     data-locale="en"
    //     data-logo_alignment="left"></div></>)
    // }
    return (
        <div className="bg-darkgray text-white md:grid grid-cols-3 flex justify-around gap-4 h-[75px] md:px-16 px-4">
                
            <Link href='/home' className="icon text-2xl font-semibold my-auto">Amburo</Link>
            <div className="grid grid-cols-2 gap-8 my-auto"> 
                <div className="">
                    <Link href='/home/browse' className="hover:underline">
                    <p className="inline md:hidden">Explore</p>
                    <p className="md:inline hidden">Explore listings</p>
                    
                    </Link>
                </div>
                <div>
                    <Link href='/home/create' className="hover:underline">
                    <p className="inline md:hidden">Create</p>
                    <p className="md:inline hidden">Create a listing</p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row justify-end my-auto gap-4"> 
                <AccountMenu />
            </div>
            {/* <Script
                src="https://accounts.google.com/gsi/client"
                strategy="lazyOnload" 
                nonce="c_lBOKfLdog8dzYQQx-baQ"
                /> */}
        </div>
    )
}

{/* <Link href='/home/account' className="py-2 px-6 font-semibold">Log in</Link>
                
                <Link href='' className="py-2 px-6 text-darkgray font-semibold bg-white rounded-3xl">Sign up</Link> */}



    // function HTMLSignIn() {
    //     return (
    //     <>
    //     <div id="g_id_onload"
    //          data-client_id="142861446606-8p5cj0nc5gunegct8332852598pkosri.apps.googleusercontent.com"
    //          data-context="signin"
    //          data-ux_mode="popup"
    //          data-login_uri="http://localhost:3000"
    //          data-auto_prompt="false">
    //     </div>
    //     <div className="g_id_signin"
    //          data-type="standard"
    //          data-shape="rectangular"
    //          data-theme="filled_black"
    //          data-text="signin_with"
    //          data-size="large"
    //          data-locale="en-US"
    //          data-logo_alignment="left">
    //     </div>
    //     </>
    //     )
    // }
import { supabaseClient } from "@/app/lib/supabase/client";


export async function fetchUserInfo() {
    const { data: { user }, error } = await supabaseClient.auth.getUser();
  
    if (error) {
      // console.error('Error fetching user info:', error);
      return null;
    }
    return user;
}

export async function handleSignOut() {
  const { error } = await supabaseClient.auth.signOut();
  return error;
}


  // {id: 'c6a04893-f50f-474b-bcca-a3848e5467c3', aud: 'authenticated', role: 'authenticated', email: 'ryandoesnothing1@gmail.com', email_confirmed_at: '2025-01-21T01:56:47.412984Z', …}
  // app_metadata
  // : 
  // {provider: 'google', providers: Array(1)}
  // aud
  // : 
  // "authenticated"
  // confirmed_at
  // : 
  // "2025-01-21T01:56:47.412984Z"
  // created_at
  // : 
  // "2025-01-21T01:56:47.40181Z"
  // email
  // : 
  // "ryandoesnothing1@gmail.com"
  // email_confirmed_at
  // : 
  // "2025-01-21T01:56:47.412984Z"
  // id
  // : 
  // "c6a04893-f50f-474b-bcca-a3848e5467c3"
  // identities
  // : 
  // [{…}]
  // is_anonymous
  // : 
  // false
  // last_sign_in_at
  // : 
  // "2025-01-28T08:04:31.834789Z"
  // phone
  // : 
  // ""
  // role
  // : 
  // "authenticated"
  // updated_at
  // : 
  // "2025-01-28T08:04:31.843889Z"
  // user_metadata
  // : 
  // avatar_url
  // : 
  // "https://lh3.googleusercontent.com/a/ACg8ocIbKgFSlxUeVocNGuEGuVYrdqo0Msenz618QD2zuJT7FEk39g=s96-c"
  // email
  // : 
  // "ryandoesnothing1@gmail.com"
  // email_verified
  // : 
  // true
  // full_name
  // : 
  // "Ryan Ng"
  // iss
  // : 
  // "https://accounts.google.com"
  // name
  // : 
  // "Ryan Ng"
  // phone_verified
  // : 
  // false
  // picture
  // : 
  // "https://lh3.googleusercontent.com/a/ACg8ocIbKgFSlxUeVocNGuEGuVYrdqo0Msenz618QD2zuJT7FEk39g=s96-c"
  // provider_id
  // : 
  // "101963125388065928524"
  // sub
  // : 
  // "101963125388065928524"
import { supabase } from "../clients/client";

export async function fetchPrivateProfile(id: string) {
    if(!id) {
        console.log('no id')
        return null
    }
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', id)
      .single();
    if(error) {
        console.log("Error fetching profile: id doesn't exist?")
        return null
    }
    console.log(data)
    return data
}


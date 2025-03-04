import { Database } from "../../types/database.types";
import { fetchUserId } from "../auth/user";
import { supabase } from "../clients/client";

type ProfileUpdate = Database['public']['Tables']['profile']['Update']

export async function updatePrivateProfile(updatedProfileData: ProfileUpdate) {
    const userId = await fetchUserId();   
    if (!userId) {
        console.error('No authenticated user found.');
        return { success: false, message: 'Sign in first!' };
    } 
    const { data: profile, error: profileError } = await supabase
        .from('profile')
        .update(updatedProfileData)
        .eq('id', userId)
        .single();

    if (profileError) {
        console.log('failed to update profile')
        return { success: false };
    }

    return { success: true, data: profile };
}
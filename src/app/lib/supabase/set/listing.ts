import { Database } from "@/app/lib/types/database.types";
import { supabase } from "@/app/lib/supabase/clients/client";
import { fetchUserId } from "@/app/lib/supabase/auth/user";

type ListingInsert = Database['public']['Tables']['listing']['Insert']
type ListingUpdate = Database['public']['Tables']['listing']['Update']
export type ListingInsertInput = Omit<ListingInsert, "providerid">

export async function createListing(listing: ListingInsertInput) {
    const userId = await fetchUserId();   
    if (!userId) {
        console.error('No authenticated user found.');
        return { success: false, message: 'Sign in first!' };
    } 
    const { data, error } = await supabase
        .from('listing')
        .insert([{
            ...listing,
            providerid: userId
        }])
        .select('id');
        // .select();
    if(error) {
        console.error('Error creating listing: ', error)
        return { success: false, message: 'An error occurred... please contact ryandoesnothing1@gmail.com about this' };
    } else {
        console.log('Hell Yeahhhhhhh')
        return { success: true, id: data[0].id, message: 'Success!' };
    }
}

export async function updateListing(listingId: number, newListing: ListingUpdate) {
    const { error } = await supabase
        .from('listing')
        .update(newListing)
        .eq('id', listingId)
    if(error) {
        console.error('Error updating listing: ', error)
    }
    return true
}
import { supabase } from "@/app/lib/supabase/clients/client";

export async function getAllListings() {
    const { data, error } = await supabase
        .from('listing')
        .select(`
            *,
            profile:profile(name)
            `)
    if(error) {
        console.error('Error fetching all listings: ', error)
        return []
    }
    return data;
}
export async function getListingsWithProvider() {
    const { data, error } = await supabase
        .from('listing')
        .select(`
            id,
            title,
            details,
            tags,
            profile:profile(name)
            `)
    if(error) {
        console.error('Error fetching all listings: ', error)
        return []
    }
    return data;
}

export async function getListing(listingId: string) {
    const { data, error } = await supabase
        .from('listing')
        .select(`
            *,
            profile:profile(name)
            `)
        .eq('id', parseInt(listingId))
    if(error) {
        console.error(`Error fetching listing ${listingId}: `, error)
        return null;
    }
    return data[0];
}
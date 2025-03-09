import { supabase } from "@/app/lib/supabase/clients/client";
import { Database } from "@/app/lib/types/database.types";

type ListingRow = Database['public']['Tables']['listing']['Row']

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

export async function getListingsWithProvider(searchQuery: string = '') {
    let query = supabase
        .from('listing')
        .select(`
            id,
            title,
            details,
            tags,
            profile:profile(name)
        `)

    // Add search functionality if search query exists
    if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,details.cs.{${searchQuery}},tags.cs.{${searchQuery}}`)
    }

    const { data, error } = await query

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

export async function getMyListings(userId: string) {
    if (!userId) return [];

    const { data, error } = await supabase
        .from('listing')
        .select(`
            id,
            title,
            details,
            createdat,
            providerid,
            description
        `)
        .eq('providerid', userId)
        .order('id', { ascending: false });

    if (error) {
        console.error('Error fetching user listings:', error);
        return [];
    }

    return data as ListingRow[];
}
// import prisma from '@/app/lib/prisma';

// export async function getListingById(listingId: string) {
//     try {
//         const listing = prisma.listing.findUnique({
//             where: {
//                 id: parseInt(listingId, 10),
//             },
//         })
//         return listing
//     } catch (e) {
//         console.error('Error: ', e)
//         return null
//     }
// }
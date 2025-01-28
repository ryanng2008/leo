import prisma from '@/app/lib/prisma';

export async function getListings() {
    return prisma.listing.findMany();
}
/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `providerId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_creatorId_fkey";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "creatorId",
ADD COLUMN     "providerId" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "hourly_rate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

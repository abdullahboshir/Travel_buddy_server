/*
  Warnings:

  - Added the required column `tripId` to the `travelBuddyRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `travelBuddyRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travelBuddyRequests" DROP CONSTRAINT "tripId_fk";

-- DropForeignKey
ALTER TABLE "travelBuddyRequests" DROP CONSTRAINT "userId_fk";

-- AlterTable
ALTER TABLE "travelBuddyRequests" ADD COLUMN     "tripId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "travelBuddyRequests" ADD CONSTRAINT "travelBuddyRequests_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelBuddyRequests" ADD CONSTRAINT "travelBuddyRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

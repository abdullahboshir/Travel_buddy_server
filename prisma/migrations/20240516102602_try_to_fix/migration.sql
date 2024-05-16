/*
  Warnings:

  - You are about to drop the `tripAlter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tripAlter" DROP CONSTRAINT "tripAlter_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_id_fkey";

-- DropIndex
DROP INDEX "travelBuddyRequests_tripId_key";

-- DropIndex
DROP INDEX "travelBuddyRequests_userId_key";

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "tripAlter";

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelBuddyRequests" ADD CONSTRAINT "travelBuddyRequests_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

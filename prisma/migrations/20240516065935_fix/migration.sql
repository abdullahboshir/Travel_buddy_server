-- DropForeignKey
ALTER TABLE "travelBuddyRequests" DROP CONSTRAINT "travelBuddyRequests_id_fkey";

-- AddForeignKey
ALTER TABLE "travelBuddyRequests" ADD CONSTRAINT "travelBuddyRequests_id_fkey" FOREIGN KEY ("id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

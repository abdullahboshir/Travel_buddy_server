-- RenameForeignKey
ALTER TABLE "travelBuddyRequests" RENAME CONSTRAINT "travelBuddyRequests_id_fkey" TO "userId_fk";

-- AddForeignKey
ALTER TABLE "travelBuddyRequests" ADD CONSTRAINT "tripId_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

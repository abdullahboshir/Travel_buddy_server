/*
  Warnings:

  - A unique constraint covering the columns `[tripId]` on the table `travelBuddyRequests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `travelBuddyRequests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "travelBuddyRequests_tripId_key" ON "travelBuddyRequests"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "travelBuddyRequests_userId_key" ON "travelBuddyRequests"("userId");

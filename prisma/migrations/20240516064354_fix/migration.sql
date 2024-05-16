-- DropForeignKey
ALTER TABLE "travelBuddyRequests" DROP CONSTRAINT "trabel_buddy_request";

-- AlterTable
ALTER TABLE "userProfiles" ALTER COLUMN "id" DROP DEFAULT;

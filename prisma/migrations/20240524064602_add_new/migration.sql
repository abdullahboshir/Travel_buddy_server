/*
  Warnings:

  - You are about to drop the column `budget` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `userProfiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `travelBuddyRequests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `description` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itinerary` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photos` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `userProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVATE', 'DEACTIVATE', 'DELETED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "travelBuddyRequests" ADD COLUMN     "agreedToTerms" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "status",
ADD COLUMN     "status" "RequestStatus" NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "budget",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "itinerary" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userProfiles" ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVATE',
ADD COLUMN     "username" TEXT NOT NULL;

-- DropEnum
DROP TYPE "status";

-- CreateIndex
CREATE UNIQUE INDEX "userProfiles_phone_key" ON "userProfiles"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

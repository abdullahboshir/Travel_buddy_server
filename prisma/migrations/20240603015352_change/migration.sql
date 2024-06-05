/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `travelers` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `travelers` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `userProfiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactNumber]` on the table `userProfiles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "userProfiles_phone_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "contactNumber",
DROP COLUMN "profilePhoto";

-- AlterTable
ALTER TABLE "travelers" DROP COLUMN "contactNumber",
DROP COLUMN "profilePhoto";

-- AlterTable
ALTER TABLE "userProfiles" DROP COLUMN "phone",
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "userProfiles_contactNumber_key" ON "userProfiles"("contactNumber");

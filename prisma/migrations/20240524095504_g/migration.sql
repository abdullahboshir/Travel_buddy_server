/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `travelers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `travelers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travelers" DROP CONSTRAINT "travelers_id_fkey";

-- AlterTable
ALTER TABLE "travelers" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "travelers_userId_key" ON "travelers"("userId");

-- AddForeignKey
ALTER TABLE "travelers" ADD CONSTRAINT "travelers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

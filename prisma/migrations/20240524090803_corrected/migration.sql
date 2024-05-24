/*
  Warnings:

  - You are about to drop the column `userName` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `travelers` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `travelers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_userName_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "userName",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "travelers" DROP COLUMN "userName",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userName",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

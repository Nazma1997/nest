/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_profileId_fkey";

-- DropIndex
DROP INDEX "user_profileId_key";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "profileId";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

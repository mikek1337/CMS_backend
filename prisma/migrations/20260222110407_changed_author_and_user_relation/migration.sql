/*
  Warnings:

  - You are about to drop the column `authorId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_authorId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "authorId";

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

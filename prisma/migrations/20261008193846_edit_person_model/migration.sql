/*
  Warnings:

  - You are about to drop the column `bio` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "bio",
DROP COLUMN "displayName",
DROP COLUMN "profileImage";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "profileImage" TEXT;

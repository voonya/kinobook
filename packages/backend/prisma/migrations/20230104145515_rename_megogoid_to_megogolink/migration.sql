/*
  Warnings:

  - You are about to drop the column `megogoId` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "megogoId",
ADD COLUMN     "megogoLink" TEXT;

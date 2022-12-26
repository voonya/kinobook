/*
  Warnings:

  - You are about to drop the column `averageRate` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `countVotes` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "averageRate",
DROP COLUMN "countVotes";

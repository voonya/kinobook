/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Viewed` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Viewed" DROP CONSTRAINT "Viewed_reviewId_fkey";

-- AlterTable
ALTER TABLE "Viewed" DROP COLUMN "reviewId",
ADD COLUMN     "description" VARCHAR(4096),
ALTER COLUMN "rate" DROP NOT NULL,
ALTER COLUMN "rate" SET DATA TYPE DECIMAL(3,2);

-- DropTable
DROP TABLE "Review";

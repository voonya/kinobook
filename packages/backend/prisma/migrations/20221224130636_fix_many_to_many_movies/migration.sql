/*
  Warnings:

  - You are about to drop the column `movieId` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Writer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Actor" DROP CONSTRAINT "Actor_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Writer" DROP CONSTRAINT "Writer_movieId_fkey";

-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "Writer" DROP COLUMN "movieId";

-- CreateTable
CREATE TABLE "_MovieToWriter" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ActorToMovie" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CountryToMovie" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToWriter_AB_unique" ON "_MovieToWriter"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToWriter_B_index" ON "_MovieToWriter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToMovie_AB_unique" ON "_ActorToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToMovie_B_index" ON "_ActorToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToMovie_AB_unique" ON "_CountryToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToMovie_B_index" ON "_CountryToMovie"("B");

-- AddForeignKey
ALTER TABLE "_MovieToWriter" ADD CONSTRAINT "_MovieToWriter_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToWriter" ADD CONSTRAINT "_MovieToWriter_B_fkey" FOREIGN KEY ("B") REFERENCES "Writer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToMovie" ADD CONSTRAINT "_ActorToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToMovie" ADD CONSTRAINT "_ActorToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToMovie" ADD CONSTRAINT "_CountryToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToMovie" ADD CONSTRAINT "_CountryToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

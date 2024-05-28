/*
  Warnings:

  - You are about to drop the column `filecode` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `geocode` on the `stations` table. All the data in the column will be lost.
  - Added the required column `fileCode` to the `stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geoCode` to the `stations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stations" DROP COLUMN "filecode",
DROP COLUMN "geocode",
ADD COLUMN     "fileCode" TEXT NOT NULL,
ADD COLUMN     "geoCode" TEXT NOT NULL;

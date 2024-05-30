/*
  Warnings:

  - The primary key for the `observed_elevation_climatology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `day` to the `observed_elevation_climatology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "observed_elevation_climatology" DROP CONSTRAINT "observed_elevation_climatology_pkey",
ADD COLUMN     "day" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "observed_elevation_climatology_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "observed_elevation_climatology_id_seq";

-- CreateIndex
CREATE INDEX "observed_elevation_climatology_day_idx" ON "observed_elevation_climatology"("day");

/*
  Warnings:

  - You are about to drop the `observed_elevation_climatology` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "observed_elevation_climatology" DROP CONSTRAINT "observed_elevation_climatology_station_id_fkey";

-- DropTable
DROP TABLE "observed_elevation_climatology";

-- CreateTable
CREATE TABLE "elevation_climatology" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "percentile_between_5_and_0" DECIMAL(65,30) NOT NULL,
    "percentile_between_10_and_5" DECIMAL(65,30) NOT NULL,
    "percentile_between_15_and_10" DECIMAL(65,30) NOT NULL,
    "percentile_between_85_and_90" DECIMAL(65,30) NOT NULL,
    "percentile_between_90_and_95" DECIMAL(65,30) NOT NULL,
    "percentile_between_95_and_100" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "elevation_climatology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "elevation_climatology_day_idx" ON "elevation_climatology"("day");

-- AddForeignKey
ALTER TABLE "elevation_climatology" ADD CONSTRAINT "elevation_climatology_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

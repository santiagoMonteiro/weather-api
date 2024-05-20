/*
  Warnings:

  - You are about to drop the column `stationId` on the `forecast_hydrological_data` table. All the data in the column will be lost.
  - You are about to drop the column `rain` on the `observed_hydrological_data` table. All the data in the column will be lost.
  - You are about to drop the column `stationId` on the `observed_hydrological_data` table. All the data in the column will be lost.
  - You are about to drop the column `stationId` on the `observed_meteorological_data` table. All the data in the column will be lost.
  - You are about to drop the `observed_climatology` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `station_id` to the `forecast_hydrological_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `station_id` to the `observed_hydrological_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accumulated_rain` to the `observed_meteorological_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `station_id` to the `observed_meteorological_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filecode` to the `stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geocode` to the `stations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "forecast_hydrological_data" DROP CONSTRAINT "forecast_hydrological_data_stationId_fkey";

-- DropForeignKey
ALTER TABLE "observed_hydrological_data" DROP CONSTRAINT "observed_hydrological_data_stationId_fkey";

-- DropForeignKey
ALTER TABLE "observed_meteorological_data" DROP CONSTRAINT "observed_meteorological_data_stationId_fkey";

-- AlterTable
ALTER TABLE "forecast_hydrological_data" DROP COLUMN "stationId",
ADD COLUMN     "station_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "observed_hydrological_data" DROP COLUMN "rain",
DROP COLUMN "stationId",
ADD COLUMN     "station_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "observed_meteorological_data" DROP COLUMN "stationId",
ADD COLUMN     "accumulated_rain" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "station_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stations" ADD COLUMN     "filecode" TEXT NOT NULL,
ADD COLUMN     "geocode" TEXT NOT NULL;

-- DropTable
DROP TABLE "observed_climatology";

-- CreateTable
CREATE TABLE "observed_elevation_climatology" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "percentile_between_5_and_0" DECIMAL(65,30) NOT NULL,
    "percentile_between_10_and_5" DECIMAL(65,30) NOT NULL,
    "percentile_between_15_and_10" DECIMAL(65,30) NOT NULL,
    "percentile_between_85_and_90" DECIMAL(65,30) NOT NULL,
    "percentile_between_90_and_95" DECIMAL(65,30) NOT NULL,
    "percentile_between_95_and_100" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "observed_elevation_climatology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "observed_elevation_climatology_station_id_key" ON "observed_elevation_climatology"("station_id");

-- AddForeignKey
ALTER TABLE "observed_hydrological_data" ADD CONSTRAINT "observed_hydrological_data_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observed_meteorological_data" ADD CONSTRAINT "observed_meteorological_data_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forecast_hydrological_data" ADD CONSTRAINT "forecast_hydrological_data_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observed_elevation_climatology" ADD CONSTRAINT "observed_elevation_climatology_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

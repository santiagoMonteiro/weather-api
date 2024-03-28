/*
  Warnings:

  - You are about to drop the column `station_id` on the `forecast_weather` table. All the data in the column will be lost.
  - You are about to drop the column `station_id` on the `observed_temperature` table. All the data in the column will be lost.
  - You are about to drop the column `station_id` on the `observed_weather` table. All the data in the column will be lost.
  - Added the required column `stationId` to the `forecast_weather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stationId` to the `observed_temperature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stationId` to the `observed_weather` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "forecast_weather" DROP CONSTRAINT "forecast_weather_station_id_fkey";

-- DropForeignKey
ALTER TABLE "observed_temperature" DROP CONSTRAINT "observed_temperature_station_id_fkey";

-- DropForeignKey
ALTER TABLE "observed_weather" DROP CONSTRAINT "observed_weather_station_id_fkey";

-- AlterTable
ALTER TABLE "forecast_weather" DROP COLUMN "station_id",
ADD COLUMN     "stationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "observed_temperature" DROP COLUMN "station_id",
ADD COLUMN     "stationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "observed_weather" DROP COLUMN "station_id",
ADD COLUMN     "stationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "observed_weather" ADD CONSTRAINT "observed_weather_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observed_temperature" ADD CONSTRAINT "observed_temperature_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forecast_weather" ADD CONSTRAINT "forecast_weather_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

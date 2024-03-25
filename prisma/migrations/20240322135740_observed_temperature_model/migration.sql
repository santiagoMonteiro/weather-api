/*
  Warnings:

  - You are about to drop the column `temperature` on the `observed_daily_weather` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "observed_daily_weather" DROP COLUMN "temperature";

-- CreateTable
CREATE TABLE "ObservedTemperature" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "ObservedTemperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObservedClimatology" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "rain" DECIMAL(65,30) NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ObservedClimatology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ObservedTemperature" ADD CONSTRAINT "ObservedTemperature_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

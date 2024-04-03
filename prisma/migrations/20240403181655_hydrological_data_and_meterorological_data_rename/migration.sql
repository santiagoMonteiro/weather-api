/*
  Warnings:

  - You are about to drop the `ObservedClimatology` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `forecast_weather` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `observed_temperature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `observed_weather` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "forecast_weather" DROP CONSTRAINT "forecast_weather_stationId_fkey";

-- DropForeignKey
ALTER TABLE "observed_temperature" DROP CONSTRAINT "observed_temperature_stationId_fkey";

-- DropForeignKey
ALTER TABLE "observed_weather" DROP CONSTRAINT "observed_weather_stationId_fkey";

-- DropTable
DROP TABLE "ObservedClimatology";

-- DropTable
DROP TABLE "forecast_weather";

-- DropTable
DROP TABLE "observed_temperature";

-- DropTable
DROP TABLE "observed_weather";

-- CreateTable
CREATE TABLE "observed_hydrological_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "rain" DECIMAL(65,30) NOT NULL,
    "stationId" TEXT NOT NULL,

    CONSTRAINT "observed_hydrological_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observed_meteorological_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,
    "humidity" INTEGER NOT NULL,
    "stationId" TEXT NOT NULL,

    CONSTRAINT "observed_meteorological_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forecast_hydrological_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "stationId" TEXT NOT NULL,

    CONSTRAINT "forecast_hydrological_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observed_climatology" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "rain" DECIMAL(65,30) NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "observed_climatology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "observed_hydrological_data" ADD CONSTRAINT "observed_hydrological_data_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observed_meteorological_data" ADD CONSTRAINT "observed_meteorological_data_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forecast_hydrological_data" ADD CONSTRAINT "forecast_hydrological_data_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

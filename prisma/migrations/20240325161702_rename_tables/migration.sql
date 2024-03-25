/*
  Warnings:

  - You are about to drop the `ObservedTemperature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `forecast_daily_weather` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `observed_daily_weather` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ObservedTemperature" DROP CONSTRAINT "ObservedTemperature_station_id_fkey";

-- DropForeignKey
ALTER TABLE "forecast_daily_weather" DROP CONSTRAINT "forecast_daily_weather_station_id_fkey";

-- DropForeignKey
ALTER TABLE "observed_daily_weather" DROP CONSTRAINT "observed_daily_weather_station_id_fkey";

-- DropTable
DROP TABLE "ObservedTemperature";

-- DropTable
DROP TABLE "forecast_daily_weather";

-- DropTable
DROP TABLE "observed_daily_weather";

-- CreateTable
CREATE TABLE "observed_weather" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "rain" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "observed_weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observed_temperature" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "observed_temperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forecast_weather" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "forecast_weather_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "observed_weather" ADD CONSTRAINT "observed_weather_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observed_temperature" ADD CONSTRAINT "observed_temperature_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forecast_weather" ADD CONSTRAINT "forecast_weather_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

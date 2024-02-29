-- CreateTable
CREATE TABLE "stations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observed_daily_weather" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "rain" DECIMAL(65,30) NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "observed_daily_weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forecast_daily_weather" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "forecast_daily_weather_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "observed_daily_weather" ADD CONSTRAINT "observed_daily_weather_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forecast_daily_weather" ADD CONSTRAINT "forecast_daily_weather_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

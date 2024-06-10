-- CreateTable
CREATE TABLE "stations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "geoCode" TEXT NOT NULL,
    "fileCode" TEXT NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observed_hydrological_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "accumulated_rain" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "observed_hydrological_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observed_meteorological_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,
    "humidity" INTEGER NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "observed_meteorological_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forecast_hydrological_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "forecast_hydrological_data_pkey" PRIMARY KEY ("id")
);

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
CREATE INDEX "forecast_hydrological_data_date_idx" ON "forecast_hydrological_data"("date");

-- CreateIndex
CREATE INDEX "elevation_climatology_day_idx" ON "elevation_climatology"("day");

-- AddForeignKey
ALTER TABLE "observed_hydrological_data" ADD CONSTRAINT "observed_hydrological_data_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observed_meteorological_data" ADD CONSTRAINT "observed_meteorological_data_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forecast_hydrological_data" ADD CONSTRAINT "forecast_hydrological_data_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elevation_climatology" ADD CONSTRAINT "elevation_climatology_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `accumulated_rain` on the `observed_meteorological_data` table. All the data in the column will be lost.
  - Added the required column `accumulated_rain` to the `observed_hydrological_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "observed_hydrological_data" ADD COLUMN     "accumulated_rain" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "observed_meteorological_data" DROP COLUMN "accumulated_rain";

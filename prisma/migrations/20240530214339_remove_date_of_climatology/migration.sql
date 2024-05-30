/*
  Warnings:

  - The primary key for the `observed_elevation_climatology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `observed_elevation_climatology` table. All the data in the column will be lost.
  - The `id` column on the `observed_elevation_climatology` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "observed_elevation_climatology" DROP CONSTRAINT "observed_elevation_climatology_pkey",
DROP COLUMN "date",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "observed_elevation_climatology_pkey" PRIMARY KEY ("id");

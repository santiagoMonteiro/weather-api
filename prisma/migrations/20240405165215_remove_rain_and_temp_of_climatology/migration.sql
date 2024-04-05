/*
  Warnings:

  - You are about to drop the column `rain` on the `observed_climatology` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `observed_climatology` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "observed_climatology" DROP COLUMN "rain",
DROP COLUMN "temperature";

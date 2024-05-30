import { STATIONS } from '@/constants/stations'
import { prisma } from '@/lib/prisma'
import { getClimatologyDataByFile } from '@/utils/get-climatology-data-by-file'

async function createInitialData() {
  await prisma.station.createMany({
    data: STATIONS,
  })

  for await (const station of STATIONS) {
    const filePath = `data/climatology/${station.id}.txt`
    const climatology = await getClimatologyDataByFile(filePath)

    let dayCounter = 0

    for await (const register of climatology) {
      dayCounter++
      await prisma.observedElevationClimatology.create({
        data: {
          percentile_between_95_and_100: register[0],
          percentile_between_90_and_95: register[1],
          percentile_between_85_and_90: register[2],
          percentile_between_15_and_10: register[3],
          percentile_between_10_and_5: register[4],
          percentile_between_5_and_0: register[5],
          day: dayCounter,
          station_id: station.id
        }
      })
    }
  }
}

createInitialData()

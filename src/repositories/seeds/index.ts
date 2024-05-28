import { STATIONS } from '@/constants/stations'
import { prisma } from '@/lib/prisma'

async function createInitialData() {
  await prisma.station.createMany({
    data: STATIONS,
  })
}

createInitialData()

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ObservedMeteorologicalDataRepository } from '../observed-meteorological-data-repository'

export class ObservedMeteorologicalDataRepositoryImpl
  implements ObservedMeteorologicalDataRepository
{
  async create(data: Prisma.ObservedMeteorologicalDataUncheckedCreateInput) {
    const observedMeteorologicalData =
      await prisma.observedMeteorologicalData.create({
        data,
      })

    return observedMeteorologicalData
  }

  async getLast(stationId: string) {
    const observedMeteorologicalData =
      await prisma.observedMeteorologicalData.findFirst({
        where: {
          station_id: stationId,
        },
        orderBy: {
          date: 'desc',
        },
      })

    return observedMeteorologicalData
  }
}

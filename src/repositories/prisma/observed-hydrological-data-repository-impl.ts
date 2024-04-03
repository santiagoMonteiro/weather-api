import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ObservedHydrologicalDataRepository } from '../observed-hydrological-data-repository'

export class ObservedHydrologicalDataRepositoryImpl
  implements ObservedHydrologicalDataRepository
{
  async create(data: Prisma.ObservedHydrologicalDataUncheckedCreateInput) {
    const observedHydrologicalData =
      await prisma.observedHydrologicalData.create({
        data,
      })

    return observedHydrologicalData
  }

  async getLast() {
    const observedHydrologicalData =
      await prisma.observedHydrologicalData.findFirst({
        orderBy: {
          date: 'desc',
        },
      })

    return observedHydrologicalData
  }
}

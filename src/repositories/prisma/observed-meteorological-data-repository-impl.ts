import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ObservedMeteorologicalDataRepository } from '../observed-meteorological-data-repository'

export class ObservedMeteorologicalDataRepositoryImpl
  implements ObservedMeteorologicalDataRepository
{
  async create(data: Prisma.ObservedMeteorologicalDataUncheckedCreateInput) {
    const temperatureRegister = await prisma.observedMeteorologicalData.create({
      data,
    })

    return temperatureRegister
  }
}

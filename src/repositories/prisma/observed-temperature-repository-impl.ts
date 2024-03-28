import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ObservedTemperatureRepository } from '../observed-temperature-repository'

export class ObservedTemperatureRepositoryImpl
  implements ObservedTemperatureRepository
{
  async create(data: Prisma.ObservedTemperatureUncheckedCreateInput) {
    const temperatureRegister = await prisma.observedTemperature.create({
      data,
    })

    return temperatureRegister
  }
}

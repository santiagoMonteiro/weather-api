import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ObservedWeatherRepository } from '../observed-weather-repository'

export class ObservedWeatherRepositoryImpl
  implements ObservedWeatherRepository
{
  async create(data: Prisma.ObservedWeatherUncheckedCreateInput) {
    const observedWeatherRegister = await prisma.observedWeather.create({
      data,
    })

    return observedWeatherRegister
  }
}

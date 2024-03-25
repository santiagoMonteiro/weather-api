import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ObservedWeatherRepository } from '../observed-weather-repository'

export class PrismaObservedWeatherRepository
  implements ObservedWeatherRepository
{
  async create(data: Prisma.ObservedWeatherCreateInput) {
    const observedWeatherRegister = await prisma.observedWeather.create({
      data,
    })

    return observedWeatherRegister
  }
}

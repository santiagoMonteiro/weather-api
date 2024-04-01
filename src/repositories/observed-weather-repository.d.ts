import { Prisma, ObservedWeather } from '@prisma/client'

export interface ObservedWeatherRepository {
  create(data: Prisma.ObservedWeatherUncheckedCreateInput): Promise<ObservedWeather>
}
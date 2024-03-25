import { ObservedTemperature, Prisma } from '@prisma/client'

export interface ObservedTemperatureRepository {
  create(data: Prisma.ObservedTemperatureCreateInput): Promise<ObservedTemperature>
}
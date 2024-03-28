import { ObservedTemperature, Prisma } from '@prisma/client'

export interface ObservedTemperatureRepository {
  create(data: Prisma.ObservedTemperatureUncheckedCreateInput): Promise<ObservedTemperature>
}
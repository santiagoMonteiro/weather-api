import { ObservedMeteorologicalData, Prisma } from '@prisma/client'

export interface ObservedMeteorologicalDataRepository {
  create(
    data: Prisma.ObservedMeteorologicalDataUncheckedCreateInput
  ): Promise<ObservedMeteorologicalData>
}

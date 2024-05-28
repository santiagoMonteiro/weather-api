import { ForecastHydrologicalData, Prisma } from '@prisma/client'

export interface ForecastHydrologicalDataRepository {
  create(dataArray: Prisma.ForecastHydrologicalDataUncheckedCreateInput): Promise<ForecastHydrologicalData>
  clearAll(): Promise<void>
}
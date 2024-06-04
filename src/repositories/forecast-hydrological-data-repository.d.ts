import { ForecastHydrologicalData, Prisma } from '@prisma/client'

export interface ForecastHydrologicalDataRepository {
  getDefaultValues(stationId: string): Promise<ForecastHydrologicalData[]>

  create(dataArray: Prisma.ForecastHydrologicalDataUncheckedCreateInput): Promise<ForecastHydrologicalData>
  clearAll(): Promise<void>
}
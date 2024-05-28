import { Prisma } from '@prisma/client'
import { ForecastHydrologicalDataRepository } from '../forecast-hydrological-data-repository';
import { prisma } from '@/lib/prisma'

export class ForecastHydrologicalDataRepositoryImpl implements ForecastHydrologicalDataRepository {
  async create(data: Prisma.ForecastHydrologicalDataUncheckedCreateInput) {
    const forecastHydrologicalData = await prisma.forecastHydrologicalData.create({
      data
    })

    return forecastHydrologicalData
  }

  async clearAll() {
    await prisma.forecastHydrologicalData.deleteMany({})
  }
}
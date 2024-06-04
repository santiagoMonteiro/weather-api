import { ForecastHydrologicalData, Prisma } from '@prisma/client'
import { ForecastHydrologicalDataRepository } from '../forecast-hydrological-data-repository';
import { prisma } from '@/lib/prisma'

export class ForecastHydrologicalDataRepositoryImpl implements ForecastHydrologicalDataRepository {
  async getDefaultValues(stationId: string) {
    const forecastDataArray: ForecastHydrologicalData[] = []
    const forecastDayRange = 15
    const forecastDayLimit = 90

    let dayCounter = forecastDayRange

    const today = new Date()
    const futureDate = new Date(today)

    while (dayCounter <= forecastDayLimit) {
      futureDate.setDate(futureDate.getDate() + forecastDayRange)
      
      const dateString = futureDate.toISOString().split('T')[0]

      const forecastRegister = await prisma.forecastHydrologicalData.findFirst({
        where: {
          date: {
            gte: new Date(`${dateString}T00:00:00Z`),
            lt: new Date(`${dateString}T23:59:59Z`),
          },
          station_id: stationId
        }
      })

      if (forecastRegister) {
        forecastDataArray.push(forecastRegister)
      } else {
        const lastForecastRegister = await prisma.forecastHydrologicalData.findFirst({
          where: {
            station_id: stationId
          },
          orderBy: {
            date: 'desc',
          }
        })

        forecastDataArray.push(lastForecastRegister!)
      }
      dayCounter += forecastDayRange
    }
    return forecastDataArray
  }

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
// Algorithm

import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ForecastHydrologicalDataRepository } from '@/repositories/forecast-hydrological-data-repository'
import { getClimatologicalInterpretation } from '@/utils/get-climatological-interpretation'
import { getDayOfYear } from '@/utils/get-day-of-year'
import { ForecastHydrologicalData } from '@prisma/client'

type GetForecastHydrologicalDataUseCaseRequest = {
  stationId: string
}

type GetForecastHydrologicalDataUseCaseResponse = {
  id: string
  date: Date
  elevation: number
  flow: number
  station_id: string
  climatologicalInterpretation: string
}

export class GetForecastHydrologicalDataUseCase {
  constructor(
    private forecastHydrologicalDataRepository: ForecastHydrologicalDataRepository,
    private elevationClimatologyRepository: ElevationClimatologyRepository
  ) {}

  async execute({
    stationId,
  }: GetForecastHydrologicalDataUseCaseRequest): Promise<GetForecastHydrologicalDataUseCaseResponse[]|null> {
    const elevationForecastWithInterpretation: GetForecastHydrologicalDataUseCaseResponse[] = []

    const forecastDataArray: ForecastHydrologicalData[] =
      await this.forecastHydrologicalDataRepository.getDefaultValues(stationId)

    if (!forecastDataArray[0]) {
      return null
    }

    for await (const forecastRegister of forecastDataArray) {
      const climatologicalRegister =
        await this.elevationClimatologyRepository.findByDayAndStation({ 
          day: getDayOfYear(forecastRegister.date),
          stationId,
        })

      const climatologicalInterpretation = getClimatologicalInterpretation({
        climatologicalRegister: climatologicalRegister!,
        elevation: forecastRegister.elevation,
      })

      elevationForecastWithInterpretation.push({
        id: forecastRegister.id,
        date: forecastRegister.date,
        elevation: forecastRegister.elevation.toNumber(),
        flow: forecastRegister.flow.toNumber(),
        station_id: forecastRegister.station_id,
        climatologicalInterpretation,
      })
    }

    return elevationForecastWithInterpretation
  }
}

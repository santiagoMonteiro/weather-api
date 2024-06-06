// Algorithm

import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ForecastHydrologicalDataRepository } from '@/repositories/forecast-hydrological-data-repository'
import { getClimatologicalInterpretation } from '@/utils/get-climatological-interpretation'
import { getDayOfYear } from '@/utils/get-day-of-year'
import { ForecastHydrologicalData } from '@prisma/client'

type GetForecastHydrologicalDataUseCaseRequest = {
  stationId: string
}

export class GetForecastHydrologicalDataUseCase {
  constructor(
    private forecastHydrologicalDataRepository: ForecastHydrologicalDataRepository,
    private elevationClimatologyRepository: ElevationClimatologyRepository
  ) {}

  async execute({ stationId }: GetForecastHydrologicalDataUseCaseRequest) {
    const elevationForecastWithInterpretation = []

    const forecastDataArray: ForecastHydrologicalData[] =
      await this.forecastHydrologicalDataRepository.getDefaultValues(stationId)

    for await (const forecastRegister of forecastDataArray) {
      const climatologicalRegister =
        await this.elevationClimatologyRepository.findByDayAndStation({
          day: getDayOfYear(forecastRegister.date),
          stationId,
        })

      const climatologicalInterpretation = getClimatologicalInterpretation({
        climatologicalRegister: climatologicalRegister!,
        elevation: forecastRegister.elevation
      })

      elevationForecastWithInterpretation.push({
        forecastRegister,
        climatologicalInterpretation 
      })
    }

    return elevationForecastWithInterpretation
  }
}

// Algorithm

import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ForecastHydrologicalDataRepository } from '@/repositories/forecast-hydrological-data-repository'
import { getClimatologicalInterpretation } from '@/utils/get-climatological-interpretation'
import { getDayOfYear } from '@/utils/get-day-of-year'
import { ForecastHydrologicalData } from '@prisma/client'

// # Como recuperar a previsão

// Parâmetros: Id da estação, Data atual

// Buscar dados adicionando (1 Mês)(parâmetro pode ser variado) à data atual
// Se o parâmetro é de 1 Mês, logo sempre deverei retornar 3 registros
// caso o último parâmetro não exista, deve-se retornar o último registro como tal

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
        forecastRegister
      })

      elevationForecastWithInterpretation.push({
        forecastRegister,
        climatologicalInterpretation 
      })
    }

    return elevationForecastWithInterpretation
  }
}

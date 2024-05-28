// ALGORITHM - COMO REGISTRAR A PREVISÃO

// somente manter na pasta os dados mais atuais
// sempre que os arquivos novos forem gerados, os anteriores devem ser removidos

// Parâmetros: Id da estação, Data inicial

// - Acessar a pasta de arquivos
// - Selecionar os dois arquivos por estação (cota e vazão)
// - Remover todos os registros do Banco de Dados referentes à estação
// - Buscar o registro da data inicial, e a partir dele registrar todos os seguintes para aquela estação

import { ForecastHydrologicalDataRepository } from '@/repositories/forecast-hydrological-data-repository'
import { StationRepository } from '@/repositories/station-repository'
import { getDifferenceInDaysBetweenDates } from '@/utils/get-difference-between-dates'
import { getForecastDataByFile } from '@/utils/get-forecast-data-by-file'

export class RegisterForecastHydrologicalDataUseCase {
  constructor(
    private forecastHydrologicalDataRepository: ForecastHydrologicalDataRepository,
    private stationsRepository: StationRepository
  ) {}

  async execute() {
    const stations = await this.stationsRepository.getAll()

    await this.forecastHydrologicalDataRepository.clearAll()

    for await (const station of stations) {
      const fileCode = station.fileCode

      const elevationFilePath = `data/SIM_INERC_Hfl_${fileCode}.TXT`
      const flowFilePath = `data/SIM_INERC_${fileCode}.TXT`

      const differenceInDays = getDifferenceInDaysBetweenDates({
        startDate: '2002-01-01',
        endDate: '2024-04-01',
      })

      const forecastData = await getForecastDataByFile({
        elevationFilePath,
        flowFilePath,
        differenceInDays
      })

      for await (const value of forecastData) {
        await this.forecastHydrologicalDataRepository.create({
          date: value.date,
          elevation: value.elevation,
          flow: value.flow,
          station_id: station.id
        })
      }
    }
  }
}

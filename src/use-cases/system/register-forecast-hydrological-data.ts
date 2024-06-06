import { ForecastHydrologicalDataRepository } from '@/repositories/forecast-hydrological-data-repository'
import { StationRepository } from '@/repositories/station-repository'
import { getDifferenceInDaysBetweenDates } from '@/utils/get-difference-between-dates'
import { getForecastDataByFile } from '@/utils/get-forecast-data-by-file'

type RegisterForecastHydrologicalDataUseCaseRequest = {
  initialRegisterDate: string
}
export class RegisterForecastHydrologicalDataUseCase {
  constructor(
    private forecastHydrologicalDataRepository: ForecastHydrologicalDataRepository,
    private stationsRepository: StationRepository
  ) {}

  async execute({ initialRegisterDate }: RegisterForecastHydrologicalDataUseCaseRequest) {
    const stations = await this.stationsRepository.getAll()

    await this.forecastHydrologicalDataRepository.clearAll()

    for await (const station of stations) {
      const fileCode = station.fileCode

      const elevationFilePath = `data/forecast/SIM_INERC_Hfl_${fileCode}.TXT`
      const flowFilePath = `data/forecast/SIM_INERC_${fileCode}.TXT`

      const differenceInDays = getDifferenceInDaysBetweenDates({
        startDate: '2002-01-01',
        endDate: initialRegisterDate, // 'YYYY-MM-DD'
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

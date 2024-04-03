import { Stations } from '@/constants/stations'
import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'
import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'

type RegisterObservedHydrologicalDataUseCaseRequest = {
  stationId: string
}

type ObservedHydrologicalDataProps = {
  items: {
    data_ult: string
    chuva_ult: number
    nivel_ult: number
    vazao_ult: number
  }[]
}

export class RegisterObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository
  ) {}

  async execute(
    stationParams: RegisterObservedHydrologicalDataUseCaseRequest[]
  ) {
    for await (const station of stationParams) {
      const response = await fetch(
        `https://ows.snirh.gov.br/ords/servicos/hidro/mapa/${station.stationId}`
      )

      const observedWeatherData: ObservedHydrologicalDataProps =
        await response.json()
        

      if (observedWeatherData) {
        this.observedHydrologicalDataRepository.create({
          date: new Date(observedWeatherData.items[0].data_ult), // adjust to real time
          elevation: observedWeatherData.items[0].nivel_ult,
          flow: observedWeatherData.items[0].vazao_ult,
          rain: observedWeatherData.items[0].chuva_ult,
          stationId: station.stationId,
        })
      }
    }
  }
}

const useCase = new RegisterObservedHydrologicalDataUseCase(
  new ObservedHydrologicalDataRepositoryImpl()
)

useCase.execute(Stations)

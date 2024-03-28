import { ObservedTemperatureRepository } from '@/repositories/observed-temperature-repository'
import { ObservedTemperatureRepositoryImpl } from '@/repositories/prisma/observed-temperature-repository-impl'

type GetObservedTemperatureUseCaseRequest = {
  geoCode: string
  stationId: string
}

type ObservedTemperatureProps = {
  dados: {
    TEM_INS: string
  }
}

export class GetObservedTemperatureUseCase {
  constructor(
    private observedTemperatureRepository: ObservedTemperatureRepository
  ) {}

  async execute(stationParams: GetObservedTemperatureUseCaseRequest[]) {
    const temperatures = stationParams.map(async (station) => {
      const response = await fetch(
        `https://apiprevmet3.inmet.gov.br/estacao/proxima/${station.geoCode}`
      )

      const observedTemperatureData: ObservedTemperatureProps =
        await response.json()

      const temperature = await this.observedTemperatureRepository.create({
        date: new Date(), // adjust the real time
        value: observedTemperatureData.dados.TEM_INS,
        stationId: station.stationId,
      })

      return temperature
    })

    return temperatures
  }
}

const useCase = new GetObservedTemperatureUseCase(
  new ObservedTemperatureRepositoryImpl()
)

useCase.execute([{ geoCode: '1301704', stationId: '123' }])

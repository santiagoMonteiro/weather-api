import { ObservedTemperatureRepository } from '@/repositories/observed-temperature-repository'

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
  // constructor(observedTemperatureRepository: ObservedTemperatureRepository) {}

  async execute(stationParams: GetObservedTemperatureUseCaseRequest[]) {
    stationParams.forEach(async (station) => {
      const response = await fetch(
        `https://apiprevmet3.inmet.gov.br/estacao/proxima/${station.geoCode}`
      )
      const observedTemperatureData: ObservedTemperatureProps =
        await response.json()

      console.log(observedTemperatureData.dados.TEM_INS)
    })
  }
}

new GetObservedTemperatureUseCase().execute([
  { geoCode: '1301704', stationId: '123' },
])

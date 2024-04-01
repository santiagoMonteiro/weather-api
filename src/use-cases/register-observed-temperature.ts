import { Stations } from '@/@types/stations'
import { ObservedTemperatureRepository } from '@/repositories/observed-temperature-repository'
import { ObservedTemperatureRepositoryImpl } from '@/repositories/prisma/observed-temperature-repository-impl'

type RegisterObservedTemperatureUseCaseRequest = {
  geoCode: string
  stationId: string
}

type ObservedTemperatureProps = {
  dados: {
    TEM_INS: string
    UMD_INS: string
    CHUVA: string
    VEN_VEL: string
    TEM_SEN: string
    DT_MEDICAO: string
    HR_MEDICAO: string
  }
}

export class RegisterObservedTemperatureUseCase {
  constructor(
    private observedTemperatureRepository: ObservedTemperatureRepository
  ) {}

  async execute(stationParams: RegisterObservedTemperatureUseCaseRequest[]) {
    for await (const station of stationParams) {
      const response = await fetch(
        `https://apiprevmet3.inmet.gov.br/estacao/proxima/${station.geoCode}`
      )

      const observedTemperatureData: ObservedTemperatureProps =
        await response.json()

      await this.observedTemperatureRepository.create({
        date: new Date(), // adjust the real time
        value: observedTemperatureData.dados.TEM_INS,
        stationId: station.stationId,
      })
    }
  }
}

const useCase = new RegisterObservedTemperatureUseCase(
  new ObservedTemperatureRepositoryImpl()
)

useCase.execute(Stations)

import { Stations } from '@/constants/stations'
import { ObservedMeteorologicalDataRepository } from '@/repositories/observed-meteorological-data-repository'
import { ObservedMeteorologicalDataRepositoryImpl } from '@/repositories/prisma/observed-meteorological-data-repository-impl'
import { formatMeteorologicalDate } from '@/utils/format-meteorological-date'

type RegisterObservedMeteorologicalDataUseCaseRequest = {
  geoCode: string
  stationId: string
}

type ObservedMeteorologicalDataProps = {
  dados: {
    TEM_INS: string
    UMD_INS: string
    DT_MEDICAO: string
    HR_MEDICAO: string
  }
}

export class RegisterObservedMeteorologicalDataUseCase {
  constructor(
    private observedMeteorologicalDataRepository: ObservedMeteorologicalDataRepository
  ) {}

  async execute(
    stationParams: RegisterObservedMeteorologicalDataUseCaseRequest[]
  ) {
    for await (const station of stationParams) {
      const response = await fetch(
        `https://apiprevmet3.inmet.gov.br/estacao/proxima/${station.geoCode}`
      )

      const observedMeteorologicalData: ObservedMeteorologicalDataProps =
        await response.json()

      const formatedDateTime = formatMeteorologicalDate({
        date: observedMeteorologicalData.dados.DT_MEDICAO,
        time: observedMeteorologicalData.dados.HR_MEDICAO,
      })
      
      await this.observedMeteorologicalDataRepository.create({
        date: new Date(formatedDateTime),
        temperature: parseFloat(observedMeteorologicalData.dados.TEM_INS),
        humidity: parseFloat(observedMeteorologicalData.dados.UMD_INS),
        stationId: station.stationId,
      })
    }
  }
}

const useCase = new RegisterObservedMeteorologicalDataUseCase(
  new ObservedMeteorologicalDataRepositoryImpl()
)

useCase.execute(Stations)

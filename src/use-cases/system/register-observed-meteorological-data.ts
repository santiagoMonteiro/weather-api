import { ObservedMeteorologicalDataRepository } from '@/repositories/observed-meteorological-data-repository'
import { StationRepository } from '@/repositories/station-repository'
import { formatMeteorologicalDate } from '@/utils/format-meteorological-date'

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
    private observedMeteorologicalDataRepository: ObservedMeteorologicalDataRepository,
    private stationRepository: StationRepository
  ) {}

  async execute() {
    const stations = await this.stationRepository.getAll()

    for await (const station of stations) {
      try {
        const response = await fetch(`https://apiprevmet3.inmet.gov.br/estacao/proxima/${station.geoCode}`)

        const observedMeteorologicalData: ObservedMeteorologicalDataProps = await response.json()

        const formatedDateTime = formatMeteorologicalDate({
          date: observedMeteorologicalData.dados.DT_MEDICAO,
          time: observedMeteorologicalData.dados.HR_MEDICAO,
        })
  
        await this.observedMeteorologicalDataRepository.create({
          date: new Date(formatedDateTime),
          temperature: parseFloat(observedMeteorologicalData.dados.TEM_INS),
          humidity: parseFloat(observedMeteorologicalData.dados.UMD_INS),
          station_id: station.id,
        })
      } catch(e) {
        console.error("Error fetching data", e)
      }
    }
  }
}

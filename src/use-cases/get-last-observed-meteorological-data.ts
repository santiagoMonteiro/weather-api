import { ObservedMeteorologicalDataRepository } from '@/repositories/observed-meteorological-data-repository'

type GetLastObservedMeteorologicalDataUseCaseRequest = {
  stationId: string
}

type GetLastObservedMeteorologicalDataUseCaseResponse = {
  id: string
  date: Date
  temperature: number
  humidity: number
  station_id: string
}

export class GetLastObservedMeteorologicalDataUseCase {
  constructor(
    private observedMeteorologicalDataRepository: ObservedMeteorologicalDataRepository
  ) {}

  async execute({
    stationId,
  }: GetLastObservedMeteorologicalDataUseCaseRequest): Promise<GetLastObservedMeteorologicalDataUseCaseResponse | null> {
    const observedMeteorologicalData =
      await this.observedMeteorologicalDataRepository.getLast(stationId)

    if (!observedMeteorologicalData?.date) {
      return null
    }

    return {
      id: observedMeteorologicalData!.id,
      date: observedMeteorologicalData!.date,
      temperature: observedMeteorologicalData!.temperature.toNumber(),
      humidity: observedMeteorologicalData!.humidity,
      station_id: observedMeteorologicalData!.station_id,
    }
  }
}

import { ObservedMeteorologicalDataRepository } from '@/repositories/observed-meteorological-data-repository'

type GetLastObservedMeteorologicalDataUseCaseRequest = {
  stationId: string
}

export class GetLastObservedMeteorologicalDataUseCase {
  constructor(
    private observedMeteorologicalDataRepository: ObservedMeteorologicalDataRepository
  ) {}

  async execute(
    stationParams: GetLastObservedMeteorologicalDataUseCaseRequest[]
  ) {
    const lastObservedMeteorologicalData = []

    for await (const station of stationParams) {
      const observedData = await this.observedMeteorologicalDataRepository.getLast(
        station.stationId
      )

      lastObservedMeteorologicalData.push(observedData)
    }

    return lastObservedMeteorologicalData
  }
}
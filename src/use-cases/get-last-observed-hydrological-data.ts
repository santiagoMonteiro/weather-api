import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'

type GetLastObservedHydrologicalDataUseCaseRequest = {
  stationId: string
}

export class GetLastObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository
  ) {}

  async execute(
    stationParams: GetLastObservedHydrologicalDataUseCaseRequest[]
  ) {
    const lastObservedHydrologicalData = []

    for await (const station of stationParams) {
      const observedData = await this.observedHydrologicalDataRepository.getLast(
        station.stationId
      )

      lastObservedHydrologicalData.push(observedData)
    }

    return lastObservedHydrologicalData
  }
}

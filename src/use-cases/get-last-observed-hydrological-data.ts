import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'

type GetLastObservedHydrologicalDataUseCaseRequest = {
  stationId: string
}

export class GetLastObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository
  ) {}

  async execute({ stationId }: GetLastObservedHydrologicalDataUseCaseRequest) {
    const observedData = await this.observedHydrologicalDataRepository.getLast(stationId)

    return observedData
  }
}

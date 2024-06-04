import { ObservedMeteorologicalDataRepository } from '@/repositories/observed-meteorological-data-repository'

type GetLastObservedMeteorologicalDataUseCaseRequest = {
  stationId: string
}

export class GetLastObservedMeteorologicalDataUseCase {
  constructor(
    private observedMeteorologicalDataRepository: ObservedMeteorologicalDataRepository
  ) {}

  async execute({ stationId }: GetLastObservedMeteorologicalDataUseCaseRequest) {
    const observedData = await this.observedMeteorologicalDataRepository.getLast(stationId)

    return observedData
  }
}

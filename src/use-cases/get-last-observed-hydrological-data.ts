import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'
import { getClimatologicalInterpretation } from '@/utils/get-climatological-interpretation'
import { getDayOfYear } from '@/utils/get-day-of-year'

type GetLastObservedHydrologicalDataUseCaseRequest = {
  stationId: string
}

export class GetLastObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository,
    private elevationClimatologyRepository: ElevationClimatologyRepository 
  ) {}

  async execute({ stationId }: GetLastObservedHydrologicalDataUseCaseRequest) {
    const observedHidrologicalData = await this.observedHydrologicalDataRepository.getLast(stationId)

    const climatologicalRegister = await this.elevationClimatologyRepository.findByDayAndStation({
      day: getDayOfYear(observedHidrologicalData!.date),
      stationId,
    })

    const climatologicalInterpretation = getClimatologicalInterpretation({
      climatologicalRegister: climatologicalRegister!,
      elevation: observedHidrologicalData!.elevation
    })

    return {
      observedHidrologicalData,
      climatologicalInterpretation
    }
  }
}

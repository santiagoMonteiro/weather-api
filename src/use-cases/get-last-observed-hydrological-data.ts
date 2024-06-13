import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'
import { getClimatologicalInterpretation } from '@/utils/get-climatological-interpretation'
import { getDayOfYear } from '@/utils/get-day-of-year'

type GetLastObservedHydrologicalDataUseCaseRequest = {
  stationId: string
}

type GetLastObservedHydrologicalDataUseCaseResponse = {
  id: string
  date: Date
  elevation: number
  flow: number
  accumulated_rain: number
  station_id: string
  climatologicalInterpretation: string
}

export class GetLastObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository,
    private elevationClimatologyRepository: ElevationClimatologyRepository
  ) {}

  async execute({
    stationId,
  }: GetLastObservedHydrologicalDataUseCaseRequest): Promise<GetLastObservedHydrologicalDataUseCaseResponse|null> {
    const observedHydrologicalData =
      await this.observedHydrologicalDataRepository.getLast(stationId)

    const climatologicalRegister =
      await this.elevationClimatologyRepository.findByDayAndStation({
        day: getDayOfYear(observedHydrologicalData!.date),
        stationId,
      })

    const climatologicalInterpretation = getClimatologicalInterpretation({
      climatologicalRegister: climatologicalRegister!,
      elevation: observedHydrologicalData!.elevation,
    })

    if (!observedHydrologicalData) {
      return null
    }

    return {
      id: observedHydrologicalData!.id,
      date: observedHydrologicalData!.date,
      elevation: observedHydrologicalData!.elevation.toNumber(),
      flow: observedHydrologicalData!.flow.toNumber(),
      accumulated_rain: observedHydrologicalData!.accumulated_rain.toNumber(),
      station_id: observedHydrologicalData!.station_id,
      climatologicalInterpretation,
    }
  }
}

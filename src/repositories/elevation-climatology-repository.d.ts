import { ElevationClimatology } from '@prisma/client'

type FindByDayAndStationProps = {
  day: number,
  stationId: string
}

export interface ElevationClimatologyRepository {
  findByDayAndStation(props: FindByDayAndStationProps): Promise<ElevationClimatology | null>
}
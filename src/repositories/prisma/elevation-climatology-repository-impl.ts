import { prisma } from '@/lib/prisma'
import { FindByDayAndStationProps, ElevationClimatologyRepository } from '../elevation-climatology-repository'

export class ElevationClimatologyRepositoryImpl implements ElevationClimatologyRepository {
  async findByDayAndStation({ day, stationId }: FindByDayAndStationProps) {
    const register = await prisma.elevationClimatology.findFirst({
      where: {
        day,
        station_id: stationId
      }
    })

    return register
  }
}
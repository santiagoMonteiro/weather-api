import { prisma } from '@/lib/prisma'
import { StationRepository } from '../station-repository'

export class StationRepositoryImpl implements StationRepository {
  async findById(stationId: string) {
    const station = await prisma.station.findUnique({
      where: {
        id: stationId,
      },
    })

    return station
  }

  async getAll() {
    const stations = await prisma.station.findMany()
    return stations
  }
}

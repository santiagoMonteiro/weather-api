import { FastifyInstance } from 'fastify'
import { observedMeteorologicalDataController } from './observed-meteorological-data'

type MeteorologicalDataRouteParams = {
  stationId: string
}

export async function meteorologicalDataRoutes(app: FastifyInstance) {
  app.get<{ Params: MeteorologicalDataRouteParams }>(
    '/api/meteorological-data/observed/:stationId',
    observedMeteorologicalDataController
  )
}

import { FastifyInstance } from 'fastify'
import { forecastHydrologicalDataController } from './forecast-hydrological-data'
import { observedHydrologicalDataController } from './observed-hydrological-data'

type HydrologicalDataRouteParams = {
  stationId: string
}

export async function hydrologicalDataRoutes(app: FastifyInstance) {
  app.get<{ Params: HydrologicalDataRouteParams }>(
    '/api/hydrological-data/forecast/:stationId',
    forecastHydrologicalDataController
  )
  app.get<{ Params: HydrologicalDataRouteParams }>(
    '/api/hydrological-data/observed/:stationId',
    observedHydrologicalDataController
  )
}

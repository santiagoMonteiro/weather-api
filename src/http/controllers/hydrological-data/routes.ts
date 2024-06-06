import { FastifyInstance } from 'fastify'
import { forecastHydrologicalDataController } from './hydrological-forecast-data'

type ObservedDataRouteParams = {
  stationId: string
}

export async function hydrologicalDataRoutes(app: FastifyInstance) {
  // app.get<{ Params: ObservedDataRouteParams }>(
  //   '/observed-data/:stationId',

  // )
  app.get<{ Params: ObservedDataRouteParams }>(
    '/hydrological-data/forecast-data/:stationId',
    forecastHydrologicalDataController
  )
}

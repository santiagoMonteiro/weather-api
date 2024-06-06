import { ElevationClimatologyRepositoryImpl } from '@/repositories/prisma/elevation-climatology-repository-impl'
import { ForecastHydrologicalDataRepositoryImpl } from '@/repositories/prisma/forecast-hydrological-data-repository-impl'
import { GetForecastHydrologicalDataUseCase } from '@/use-cases/get-forecast-hydrological-data'
import { FastifyReply, FastifyRequest } from 'fastify'

type ForecastHydrologicalDataControllerRouteParams = {
  stationId: string
}

export async function forecastHydrologicalDataController(
  request: FastifyRequest<{
    Params: ForecastHydrologicalDataControllerRouteParams
  }>,
  reply: FastifyReply
) {
  const stationId = request.params.stationId

  const getForecastHydrologicalDataUseCase =
    new GetForecastHydrologicalDataUseCase(
      new ForecastHydrologicalDataRepositoryImpl(),
      new ElevationClimatologyRepositoryImpl()
    )

  const forecastHydrologicalData =
    await getForecastHydrologicalDataUseCase.execute({ stationId })

  return reply.status(200).send({
    forecastHydrologicalData,
  })
}

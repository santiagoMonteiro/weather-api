import { ObservedMeteorologicalDataRepositoryImpl } from '@/repositories/prisma/observed-meteorological-data-repository-impl'
import { GetLastObservedMeteorologicalDataUseCase } from '@/use-cases/get-last-observed-meteorological-data'
import { FastifyReply, FastifyRequest } from 'fastify'

type ObservedMeteorologicalDataControllerRouteParams = {
  stationId: string
}

export async function observedMeteorologicalDataController(
  request: FastifyRequest<{
    Params: ObservedMeteorologicalDataControllerRouteParams
  }>,
  reply: FastifyReply
) {
  const stationId = request.params.stationId

  const getObservedMeteorologicalDataUseCase =
    new GetLastObservedMeteorologicalDataUseCase(
      new ObservedMeteorologicalDataRepositoryImpl(),
    )

  const observedMeteorologicalData =
    await getObservedMeteorologicalDataUseCase.execute({ stationId })

  return reply.status(200).send({
    ...observedMeteorologicalData,
  })
}

import { ElevationClimatologyRepositoryImpl } from '@/repositories/prisma/elevation-climatology-repository-impl'
import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'
import { GetLastObservedHydrologicalDataUseCase } from '@/use-cases/get-last-observed-hydrological-data'
import { FastifyReply, FastifyRequest } from 'fastify'

type ObservedHydrologicalDataControllerRouteParams = {
  stationId: string
}

export async function observedHydrologicalDataController(
  request: FastifyRequest<{
    Params: ObservedHydrologicalDataControllerRouteParams
  }>,
  reply: FastifyReply
) {
  const stationId = request.params.stationId

  const getObservedHydrologicalDataUseCase =
    new GetLastObservedHydrologicalDataUseCase(
      new ObservedHydrologicalDataRepositoryImpl(),
      new ElevationClimatologyRepositoryImpl()
    )

  const observedHydrologicalData =
    await getObservedHydrologicalDataUseCase.execute({ stationId })

  return reply.status(200).send({
    ...observedHydrologicalData,
  })
}

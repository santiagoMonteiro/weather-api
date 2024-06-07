import fastify from 'fastify'
import { hydrologicalDataRoutes } from './http/controllers/hydrological-data/routes'
import { meteorologicalDataRoutes } from './http/controllers/meteorological-data/routes'

export const app = fastify()

app.register(hydrologicalDataRoutes)
app.register(meteorologicalDataRoutes)
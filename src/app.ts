import fastify from 'fastify'
import { hydrologicalDataRoutes } from './http/controllers/hydrological-data/routes'

export const app = fastify()

app.register(hydrologicalDataRoutes)
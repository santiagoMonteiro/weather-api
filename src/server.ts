import { app } from './app'
import { registerObservedDataFactory } from './use-cases/factories/register-observed-data-factory'

setInterval(() => registerObservedDataFactory.execute(), 1 * 60 * 1000)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })

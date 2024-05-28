import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'
import { RegisterObservedHydrologicalDataUseCase } from './register-observed-hydrological-data'
import { RegisterObservedMeteorologicalDataUseCase } from './register-observed-meteorological-data'
import { ObservedMeteorologicalDataRepositoryImpl } from '@/repositories/prisma/observed-meteorological-data-repository-impl'
import { GetLastObservedHydrologicalDataUseCase } from './get-last-observed-hydrological-data'
import { GetLastObservedMeteorologicalDataUseCase } from './get-last-observed-meteorological-data'
import { StationRepositoryImpl } from '@/repositories/prisma/station-repository-impl'
import { RegisterForecastHydrologicalDataUseCase } from './register-forecast-hydrological-data'
import { ForecastHydrologicalDataRepositoryImpl } from '@/repositories/prisma/forecast-hydrological-data-repository-impl'

// const useCase1 = new RegisterObservedHydrologicalDataUseCase(
//   new ObservedHydrologicalDataRepositoryImpl(),
//   new StationRepositoryImpl()
// )

// useCase1.execute()

// /* ------------------------------------------------------------- */

// const useCase2 = new RegisterObservedMeteorologicalDataUseCase(
//   new ObservedMeteorologicalDataRepositoryImpl(),
//   new StationRepositoryImpl()
// )

// useCase2.execute()



/* ------------------------------------------------------------- */

// const useCase3 = new GetLastObservedHydrologicalDataUseCase(
//   new ObservedHydrologicalDataRepositoryImpl()
// )

// useCase3.execute(Stations).then(data => console.log(data))


/* ------------------------------------------------------------- */

// const useCase4 = new GetLastObservedMeteorologicalDataUseCase(
//   new ObservedMeteorologicalDataRepositoryImpl()
// )
// useCase4.execute(Stations).then(data => console.log(data))

const useCase5 = new RegisterForecastHydrologicalDataUseCase(
  new ForecastHydrologicalDataRepositoryImpl(),
  new StationRepositoryImpl()
)

useCase5.execute()
import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'
import { RegisterObservedHydrologicalDataUseCase } from './register-observed-hydrological-data'
import { Stations } from '@/constants/stations'
import { RegisterObservedMeteorologicalDataUseCase } from './register-observed-meteorological-data'
import { ObservedMeteorologicalDataRepositoryImpl } from '@/repositories/prisma/observed-meteorological-data-repository-impl'
import { GetLastObservedHydrologicalDataUseCase } from './get-last-observed-hydrological-data'
import { GetLastObservedMeteorologicalDataUseCase } from './get-last-observed-meteorological-data'

const useCase1 = new RegisterObservedHydrologicalDataUseCase(
  new ObservedHydrologicalDataRepositoryImpl()
)

useCase1.execute(Stations)

/* ------------------------------------------------------------- */

const useCase2 = new RegisterObservedMeteorologicalDataUseCase(
  new ObservedMeteorologicalDataRepositoryImpl()
)

useCase2.execute(Stations)

/* ------------------------------------------------------------- */

// const useCase3 = new GetLastObservedHydrologicalDataUseCase(
//   new ObservedHydrologicalDataRepositoryImpl()
// )

// useCase3.execute(Stations)

/* ------------------------------------------------------------- */

// const useCase4 = new GetLastObservedMeteorologicalDataUseCase(
//   new ObservedMeteorologicalDataRepositoryImpl()
// )

// useCase4.execute(Stations)
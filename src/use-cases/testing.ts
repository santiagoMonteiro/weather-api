import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'
import { RegisterObservedHydrologicalDataUseCase } from './register-observed-hydrological-data'
import { RegisterObservedMeteorologicalDataUseCase } from './register-observed-meteorological-data'
import { ObservedMeteorologicalDataRepositoryImpl } from '@/repositories/prisma/observed-meteorological-data-repository-impl'
import { GetLastObservedHydrologicalDataUseCase } from './get-last-observed-hydrological-data'
import { GetLastObservedMeteorologicalDataUseCase } from './get-last-observed-meteorological-data'
import { StationRepositoryImpl } from '@/repositories/prisma/station-repository-impl'
import { RegisterForecastHydrologicalDataUseCase } from './register-forecast-hydrological-data'
import { ForecastHydrologicalDataRepositoryImpl } from '@/repositories/prisma/forecast-hydrological-data-repository-impl'
import { GetForecastHydrologicalDataUseCase } from './get-forecast-hydrological-data'
import { ElevationClimatologyRepositoryImpl } from '@/repositories/prisma/elevation-climatology-repository-impl'

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
// ).execute()

// const useCase5 = new RegisterForecastHydrologicalDataUseCase(
//   new ForecastHydrologicalDataRepositoryImpl(),
//   new StationRepositoryImpl()
// )

// useCase5.execute({ initialRegisterDate: '2024-05-01' })

const useCase6 = new GetForecastHydrologicalDataUseCase(
  new ForecastHydrologicalDataRepositoryImpl(),
  new ElevationClimatologyRepositoryImpl()
).execute({ stationId: '15630000' }).then(data => console.log(data))
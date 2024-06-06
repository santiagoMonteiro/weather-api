import { ForecastHydrologicalDataRepositoryImpl } from '@/repositories/prisma/forecast-hydrological-data-repository-impl'
import { RegisterForecastHydrologicalDataUseCase } from '../system/register-forecast-hydrological-data'
import { StationRepositoryImpl } from '@/repositories/prisma/station-repository-impl'

const registerForecastHydrologicalDataUseCase =
  new RegisterForecastHydrologicalDataUseCase(
    new ForecastHydrologicalDataRepositoryImpl(),
    new StationRepositoryImpl()
  )

const args = process.argv.slice(2)
const initialRegisterDate = args[0]

if (initialRegisterDate) {
  registerForecastHydrologicalDataUseCase.execute({ initialRegisterDate })
} else {
  console.error("Initial register date is missing!")
}

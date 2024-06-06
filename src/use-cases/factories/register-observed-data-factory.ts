import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'
import { RegisterObservedHydrologicalDataUseCase } from '../system/register-observed-hydrological-data'
import { StationRepositoryImpl } from '@/repositories/prisma/station-repository-impl'
import { RegisterObservedMeteorologicalDataUseCase } from '../system/register-observed-meteorological-data'
import { ObservedMeteorologicalDataRepositoryImpl } from '@/repositories/prisma/observed-meteorological-data-repository-impl'

class RegisterObservedDataFactory {
  private registerObservedHydrologicalDataUseCase
  private registerObservedMeteorologicalDataUseCase

  constructor() {
    this.registerObservedHydrologicalDataUseCase = new RegisterObservedHydrologicalDataUseCase(
      new ObservedHydrologicalDataRepositoryImpl(),
      new StationRepositoryImpl()
    )

    this.registerObservedMeteorologicalDataUseCase = new RegisterObservedMeteorologicalDataUseCase(
      new ObservedMeteorologicalDataRepositoryImpl(),
      new StationRepositoryImpl()
    )
  }

  async execute() {
    await this.registerObservedHydrologicalDataUseCase.execute()
    await this.registerObservedMeteorologicalDataUseCase.execute()
  }
}

export const registerObservedDataFactory = new RegisterObservedDataFactory()
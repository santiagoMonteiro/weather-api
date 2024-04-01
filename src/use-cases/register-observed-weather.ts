import { Stations } from '@/@types/stations'
import { ObservedWeatherRepository } from '@/repositories/observed-weather-repository'
import { ObservedWeatherRepositoryImpl } from '@/repositories/prisma/observed-weather-repository-impl'
import { ObservedWeatherCrowler } from '@/scrapping/observed-weather-crowler'
import { ObservedWeatherCrowlerImpl } from '@/scrapping/puppeteer/observed-weather-crowler-impl'


type RegisterObservedWeatherUseCaseRequest = {
  stationId: string
  subBasinsOptionValue: string
  stationOptionValue: string
}

export class RegisterObservedWeatherUseCase {
  constructor(
    private observedWeatherCrowler: ObservedWeatherCrowler,
    private observedWeatherRepository: ObservedWeatherRepository
  ) {}

  async execute(stationsParams: RegisterObservedWeatherUseCaseRequest[]) {
    await this.observedWeatherCrowler.launchBrowser()
    await this.observedWeatherCrowler.accessTheMainPageToSetCookie()
    await this.observedWeatherCrowler.accessDataPage()

    for await (const station of stationsParams) {
      await this.observedWeatherCrowler.selectPageElements({
        subBasinsOptionValue: station.subBasinsOptionValue,
        stationOptionValue: station.stationOptionValue,
      })

      const stationWeatherData =
        await this.observedWeatherCrowler.getWeatherData()

      if (stationWeatherData) {
        this.observedWeatherRepository.create({
          date: new Date(), // adjust to real time
          elevation: stationWeatherData.elevation,
          flow: stationWeatherData.flow,
          rain: stationWeatherData.rain,
          stationId: station.stationId,
        })
      }
    }

    await this.observedWeatherCrowler.closeBrowser()
  }
}

const useCase = new RegisterObservedWeatherUseCase(
  new ObservedWeatherCrowlerImpl(),
  new ObservedWeatherRepositoryImpl()
)

useCase.execute(Stations)

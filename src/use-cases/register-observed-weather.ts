import { ObservedWeatherRepository } from '@/repositories/observed-weather-repository'
import { ObservedWeatherCrowler } from '@/scrapping/observed-weather-crowler'
import { ObservedWeatherCrowlerImpl } from '@/scrapping/puppeteer/observed-weather-crowler-impl'

// const subBasinsOptionValue = '15'
// const stationOptionValue = '73063010'

type GetObservedWeatherUseCaseRequest = {}


export class GetObservedWeatherUseCase {
  constructor(
    private observedWeatherCrowler: ObservedWeatherCrowler,
    private observedWeatherRepository: ObservedWeatherRepository
  ) {}

  async execute({}: GetObservedWeatherUseCaseRequest) {
    await this.observedWeatherCrowler.launchBrowser()
    await this.observedWeatherCrowler.accessTheMainPageToSetCookie()
    await this.observedWeatherCrowler.accessDataPage()
    await this.observedWeatherCrowler.selectPageElements()
    const weatherData = await this.observedWeatherCrowler.getWeatherData()
    await this.observedWeatherCrowler.closeBrowser()

    return weatherData
  }
}

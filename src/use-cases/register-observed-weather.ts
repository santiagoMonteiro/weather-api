import { ObservedWeatherRepository } from '@/repositories/observed-weather-repository'
import { ObservedWeatherCrowler } from '@/scrapping/observed-weather-crowler'
import { ObservedWeatherCrowlerImpl } from '@/scrapping/puppeteer/observed-weather-crowler-impl'

// const subBasinsOptionValue = '15'
// const stationOptionValue = '73063010'

type GetObservedWeatherUseCaseRequest = {

}

async function teste() {
  const scrapper = new ObservedWeatherCrowlerImpl()
  await scrapper.launchBrowser()
  await scrapper.accessTheMainPageToSetCookie()
  await scrapper.accessDataPage()
  await scrapper.selectPageElements()
  const data = await scrapper.getWeatherData()
  await scrapper.closeBrowser()
  console.log(data)
}

teste()

export class GetObservedWeatherUseCase {
  constructor(
    private observedWeatherRepository: ObservedWeatherRepository,
    observedWeatherCrowler: ObservedWeatherCrowler
  ) {}

  async execute({}: GetObservedWeatherUseCaseRequest) {

  }
}

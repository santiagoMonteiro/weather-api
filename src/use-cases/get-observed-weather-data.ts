import { ObservedWeatherCrowlerImpl } from '@/scrapping/puppeteer/observed-weather-crowler-impl'

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
import { Browser, Page } from 'puppeteer'

type ObservedWeatherCrowlerData = {
  date: string
  rain: string
  elevation: string
  flow: string
}

type SelectPageElementsProps = {
  subBasinsOptionValue: string
  stationOptionValue: string
}

export interface ObservedWeatherCrowler {
  launchBrowser(): Promise<void>
  closeBrowser(): Promise<void>
  accessTheMainPageToSetCookie(): Promise<void>
  accessDataPage(): Promise<void>
  selectPageElements(props: SelectPageElementsProps): Promise<void>
  getWeatherData(): Promise<ObservedWeatherCrowlerData | undefined>
  delay(time: number): Promise<unknown>
}
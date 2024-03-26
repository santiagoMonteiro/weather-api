import puppeteer, { Browser, Page } from 'puppeteer'
import {
  ObservedWeatherCrowler,
  ObservedWeatherCrowlerData,
} from '../observed-weather-crowler'

export class ObservedWeatherCrowlerImpl implements ObservedWeatherCrowler {
  private browser: Browser | null
  private page: Page | null
  private dataUrl = 'https://www.snirh.gov.br/hidrotelemetria/serieHistorica.aspx'

  constructor() {
    this.browser = null
    this.page = null
  }

  async delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }

  async launchBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    })

    this.page = await this.browser.newPage()
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close()
    }
  }

  async accessTheMainPageToSetCookie() {
    if (this.page) {
      const defaultUrl = 'https://www.snirh.gov.br/hidrotelemetria/Default.html'

      await this.page.goto(defaultUrl, {
        waitUntil: 'domcontentloaded',
      })

      await this.delay(2000)
    }
  }

  async accessDataPage() {
    if (this.page) {
      await this.page.goto(this.dataUrl, {
        waitUntil: 'networkidle0',
      })
    }
  }

  async selectPageElements() {
    if (this.page) {
      const subBasinsSelectElement =
        'select[name="ctl00$cphCorpo$ctl01$lstSub"]'
      const subBasinsOptionValue = '15'

      await this.page.select(subBasinsSelectElement, subBasinsOptionValue)

      await this.delay(5000)

      const stationSelectElement =
        'select[name="ctl00$cphCorpo$ctl01$lstEstacoes"]'

      const stationOptionValue = '73063010'

      await this.page.select(stationSelectElement, stationOptionValue)

      await this.delay(5000)
    }
  }

  async getWeatherData() {
    if (this.page) {
      const data = await this.page!.evaluate(() => {
        const dataTable = document.querySelector('#cphCorpo_gdDados') as Element
        const lines = dataTable.querySelectorAll('tr')
  
        for (let i = 6; i < lines.length; i++) {
          const observedData = lines[i].querySelectorAll('td')
          const dataArray = Array.from(
            observedData,
            (e) => e.textContent
          ) as string[]
  
          const fullData = !dataArray.includes('')
  
          if (fullData) {
            return {
              date: dataArray[0],
              rain: dataArray[1],
              elevation: dataArray[2],
              flow: dataArray[3],
            } as ObservedWeatherCrowlerData
          }
  
          return undefined
        }
      })
  
      return data
    }
  }
}
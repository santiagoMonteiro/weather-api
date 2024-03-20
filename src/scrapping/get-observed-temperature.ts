import puppeteer from 'puppeteer'

function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

async function getObservedWeatherData(): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  })

  const page = await browser.newPage()

  const dataUrl = 'https://portal.inmet.gov.br/'

  await page.goto(dataUrl, {
    waitUntil: 'networkidle2',
  })

  await page.evaluate(() => {
    localStorage.setItem('geoCode', '1301704')
    localStorage.setItem('previsaoCidade', 'AM-Humaitá')
  })

  await page.goto(dataUrl, {
    waitUntil: 'networkidle2',
  })

  const data = await page.evaluate(() => {
    const e = document.querySelector(
      '#tempoagora > div > div.row > div:nth-child(1) > div'
    ) as Element

    return e.innerHTML
  })

  const temperatureString = data.split('>')[1].trim().slice(0, -2)

  await browser.close()

  return temperatureString
}

getObservedWeatherData().then((temp) => {
  console.log(parseFloat(temp.replace(/,/g, '.')))
})


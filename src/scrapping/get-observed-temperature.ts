import puppeteer from 'puppeteer'

function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

async function getObservedWeatherData() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  })

  const page = await browser.newPage()

  const dataUrl = 'https://portal.inmet.gov.br/'

  await page.goto(dataUrl, {
    waitUntil: 'networkidle2',
  })


  const data = await page.evaluate(() => {
    const e = document.querySelector("#tempoagora > div > div.row > div:nth-child(1) > div") as Element
    
    return e.innerHTML
  })

  console.log(data)

  await browser.close()
}

getObservedWeatherData()

import puppeteer from 'puppeteer'

function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

async function getWeatherData() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  })

  const page = await browser.newPage()

  const defaultUrl = 'https://www.snirh.gov.br/hidrotelemetria/Default.html'
  const dataUrl = 'https://www.snirh.gov.br/hidrotelemetria/serieHistorica.aspx'

  await page.goto(defaultUrl, {
    waitUntil: 'domcontentloaded',
  })

  await delay(500)

  await page.goto(dataUrl, {
    waitUntil: 'domcontentloaded',
  })

  const subBasinsSelectElement = 'select[name="ctl00$cphCorpo$ctl01$lstSub"]'
  const subBasinsOptionValue = '15'

  await page.select(subBasinsSelectElement, subBasinsOptionValue)

  await delay(5000)

  const stationSelectElement = 'select[name="ctl00$cphCorpo$ctl01$lstEstacoes"]'
  const stationOptionValue = '73063010'

  await page.select(stationSelectElement, stationOptionValue)

  await delay(5000)

  const data = await page.evaluate(() => {
    const dataTable = document.querySelector('#cphCorpo_gdDados') as Element
    const lines = dataTable.querySelectorAll('tr')
    const observed = lines[6].querySelectorAll('td')
    const array = Array.from(observed, e => e.textContent)

    return array
  })

  data.forEach(e => {
    console.log(e);
  });
  
  // console.log(Array.from(data))
  await browser.close()
}

getWeatherData()
import puppeteer from 'puppeteer'

function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

async function getObservedWeatherData() {
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

  await delay(2000)

  await page.goto(dataUrl, {
    waitUntil: 'networkidle0',
  })

  const subBasinsSelectElement = 'select[name="ctl00$cphCorpo$ctl01$lstSub"]'
  const subBasinsOptionValue = '15'

  await page.select(subBasinsSelectElement, subBasinsOptionValue)

  await delay(5000)

  // document.querySelector("#cphCorpo_ctl01_lstSub")

  const stationSelectElement = 'select[name="ctl00$cphCorpo$ctl01$lstEstacoes"]'
  const stationOptionValue = '73063010'

  await page.select(stationSelectElement, stationOptionValue)

  await delay(5000)

  const data = await page.evaluate(() => {
    const dataTable = document.querySelector('#cphCorpo_gdDados') as Element
    const lines = dataTable.querySelectorAll('tr')

    for (let i = 6; i < lines.length; i++) {
      const observedData = lines[i].querySelectorAll('td')
      const dataArray = Array.from(observedData, (e) => e.textContent) as string[]

      const fullData = !dataArray.includes('')

      if (fullData) {
        return dataArray
      }
    }
  })

  if (data) {
    console.log({
      data_hora: data[0],
      chuva_horaria: data[1],
      nivel_adotado: data[2],
      vazao: data[3]
    })
  } else {
    console.log("Erro de leitura")
  }

  await browser.close()
}

getObservedWeatherData()

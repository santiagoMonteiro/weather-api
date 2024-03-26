async function getTemperature(stationCode: number) {
  const data = await fetch(
    `https://apiprevmet3.inmet.gov.br/estacao/proxima/${stationCode}`
  )
  const json = await data.json()
  return json
}

getTemperature(1301704).then((data) => console.log(data))
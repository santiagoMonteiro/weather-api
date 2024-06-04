import fs from 'fs'
import readline from 'readline'

type ForecastValue = [Date, number]

function readLinesFromFile(filePath: string, differenceInDays: number) {
  return new Promise((resolve, reject) => {
    const outputArray: ForecastValue[] = []
    let lineCount = 0

    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    rl.on('line', (line) => {
      lineCount++

      if (lineCount > differenceInDays) {
        const rawLine = line
          .split(' ')
          .filter((e) => e !== '')
          .map((m) => Number(m))
        const [day, month, year, value] = rawLine
        const registerDate = new Date(year, month - 1, day)
        const register: ForecastValue = [registerDate, value]
        outputArray.push(register)
      }
    })

    rl.on('close', () => {
      resolve(outputArray)
    })

    rl.on('error', (err) => {
      reject(err)
    })
  })
}

type GetForecastDataByFileProps = {
  elevationFilePath: string
  flowFilePath: string
  differenceInDays: number
}

export async function getForecastDataByFile({
  elevationFilePath,
  flowFilePath,
  differenceInDays,
}: GetForecastDataByFileProps) {
  const elevationForecastData = (await readLinesFromFile(
    elevationFilePath,
    differenceInDays
  )) as ForecastValue[]

  const flowForecastData = (await readLinesFromFile(
    flowFilePath,
    differenceInDays
  )) as ForecastValue[]

  const elevationAndFlowData = elevationForecastData.map((_, i) => {
    const date = elevationForecastData[i][0]
    const elevation = elevationForecastData[i][1]
    const flow = flowForecastData[i][1]

    return { date, elevation, flow }
  })

  return elevationAndFlowData
}

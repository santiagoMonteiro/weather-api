import fs from 'fs'
import readline from 'readline'

type ClimatologyRegister = [number, number, number, number, number, number]

export function getClimatologyDataByFile(filePath: string): Promise<ClimatologyRegister[]> {
  return new Promise((resolve, reject) => {
    const outputArray: ClimatologyRegister[] = []

    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    rl.on('line', (line) => {
      const register = line
        .replaceAll(',', '.')
        .split('\t')
        .map((m) => Number(m))
        .sort((a, b) => a - b) as ClimatologyRegister

      outputArray.push(register)
    })

    rl.on('close', () => {
      resolve(outputArray)
    })

    rl.on('error', (err) => {
      reject(err)
    })
  })
}
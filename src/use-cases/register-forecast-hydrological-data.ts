// Algorithm

// # Como registrar a previsão

// somente manter na pasta os dados mais atuais
// sempre que os arquivos novos forem gerados, os anteriores devem ser removidos

// Parâmetros: Id da estação, Data inicial

// - acessar a pasta de arquivos
// - selecionar os dois arquivos por estação
// - Eliminar as primeiras 8k linhas de cada
// - remover todos os registros da estação
// - Buscar o registro da data inicial, e a partir dele registrar todos os seguintes para aquela estação

import { getDifferenceInDaysBetweenDates } from '@/utils/getDifferenceBetweenDates'
import fs from 'fs'
import readline from 'readline'

const fileCode = 1073

const elevationFilePath = `data/SIM_INERC_Hfl_${fileCode}.TXT`
const flowFilePath = `data/SIM_INERC_${fileCode}.TXT`

const differenceInDays = getDifferenceInDaysBetweenDates({
  startDate: '2002-01-01',
  endDate: '2024-04-01'
})

console.log(differenceInDays)

let lineCount = 0

const readInterfaceForElevation = readline.createInterface({
  input: fs.createReadStream(elevationFilePath),
})

readInterfaceForElevation.on('line', (line) => {
  lineCount++

  if (lineCount > differenceInDays) {
    console.log(line.split(" ").filter(e => e !== ''))
  }
})

const readInterfaceForFlow = readline.createInterface({
  input: fs.createReadStream(flowFilePath),
})

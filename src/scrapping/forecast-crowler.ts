import { readFile } from 'fs'

readFile('data/SIM_INERC_1073.TXT', 'utf8', (err, data) => {
  const lines = data.split('\n')
  console.log(lines.slice(-31 * 4))
})

import { ElevationClimatology } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

type GetClimatologicalInterpretationProps = {
  elevation: Decimal
  climatologicalRegister: ElevationClimatology
}

export function getClimatologicalInterpretation(
  { elevation, climatologicalRegister }: GetClimatologicalInterpretationProps
) {
  let interpretation = ''
  
  if (elevation < climatologicalRegister!.percentile_between_95_and_100) {
    interpretation = '-3'
  } else if (
    elevation >= climatologicalRegister!.percentile_between_95_and_100 &&
    elevation < climatologicalRegister!.percentile_between_90_and_95
  ) {
    interpretation = '-2'
  } else if (
    elevation >= climatologicalRegister!.percentile_between_90_and_95 &&
    elevation < climatologicalRegister!.percentile_between_85_and_90
  ) {
    interpretation = '-1'
  } else if (
    elevation >= climatologicalRegister!.percentile_between_85_and_90 &&
    elevation < climatologicalRegister!.percentile_between_5_and_0
  ) {
    interpretation = '0'
  } else if (
    elevation >= climatologicalRegister!.percentile_between_5_and_0 &&
    elevation < climatologicalRegister!.percentile_between_10_and_5
  ) {
    interpretation = '1'
  } else if (
    elevation >= climatologicalRegister!.percentile_between_10_and_5 &&
    elevation < climatologicalRegister!.percentile_between_15_and_10
  ) {
    interpretation = '2'
  } else if (
    elevation >= climatologicalRegister!.percentile_between_15_and_10
  ) {
    interpretation = '3'
  }

  return interpretation
}


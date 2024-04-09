type GetDifferenceInDaysBetweenDatesProps = {
  startDate: string
  endDate: string
}

/**
 * Date format: YYYY-MM-DD
 */
export function getDifferenceInDaysBetweenDates({
  startDate,
  endDate,
}: GetDifferenceInDaysBetweenDatesProps) {
  const dt1 = new Date(startDate)
  const dt2 = new Date(endDate)

  const differenceInMilliseconds = Math.abs(dt1.getTime() - dt2.getTime())

  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  )

  return differenceInDays
}

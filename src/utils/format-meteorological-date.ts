type FormatMeteorologicalDateProps = {
  date: string
  time: string
}

export function formatMeteorologicalDate({ date, time}: FormatMeteorologicalDateProps) {
  const timezone = -4

  const hours = parseInt(time.substring(0, 2)) + timezone
  const minutes = time.substring(2)

  const datetime = `${date}T${hours}:${minutes}:00.000Z`

  return datetime
}

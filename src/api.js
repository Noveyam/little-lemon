import { localDate, parseDate, validateBooking } from './booking'
// Deterministic local simulation supplied by the course. No network requests.
const seededRandom = (seed) => {
  const m = 2 ** 35 - 31
  let s = seed % m
  return () => (s = (s * 185852) % m) / m
}
export function fetchAPI(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return []
  const result = []
  const random = seededRandom(date.getDate())
  for (let hour = 17; hour <= 23; hour++) {
    if (random() < 0.5) result.push(`${hour}:00`)
    if (random() < 0.5) result.push(`${hour}:30`)
  }
  return result
}
export function submitAPI(data) {
  if (!data) return false
  const date = parseDate(data.bookingDate)
  return Boolean(
    date &&
      Object.keys(validateBooking(data, fetchAPI(date), localDate())).length ===
        0,
  )
}

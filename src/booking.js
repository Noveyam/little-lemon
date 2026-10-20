// Date inputs use local calendar dates, not UTC timestamps.
export const localDate = (date = new Date()) => {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export const parseDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return localDate(date) === value ? date : null
}

export function validateBooking(data, availableTimes, today = localDate()) {
  const errors = {}
  if (!parseDate(data.bookingDate) || data.bookingDate < today)
    errors.bookingDate = 'Choose today or a future date.'
  if (!availableTimes.includes(data.bookingTime))
    errors.bookingTime = 'Choose an available time.'
  const diners = Number(data.diners)
  if (!Number.isInteger(diners) || diners < 1 || diners > 12)
    errors.diners = 'Enter a whole number from 1 to 12.'
  if (
    !['none', 'birthday', 'engagement', 'anniversary'].includes(data.occasion)
  )
    errors.occasion = 'Choose an occasion.'
  if (!['standard', 'outside'].includes(data.seatingOption))
    errors.seatingOption = 'Choose a seating option.'
  return errors
}

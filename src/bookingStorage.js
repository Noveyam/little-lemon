import { parseDate } from './booking'

export const STORAGE_KEY = 'little-lemon.demo-bookings.v1'

// Persist reservation details only. Names and email never enter this store.
export function toReceipt(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    typeof value.id !== 'string' ||
    value.id.length > 100 ||
    !value.id ||
    !parseDate(value.bookingDate) ||
    !/^(1[7-9]|2[0-3]):(00|30)$/.test(value.bookingTime) ||
    !Number.isInteger(value.diners) ||
    value.diners < 1 ||
    value.diners > 12 ||
    !['none', 'birthday', 'engagement', 'anniversary'].includes(
      value.occasion,
    ) ||
    !['standard', 'outside'].includes(value.seatingOption)
  )
    return null
  const { id, bookingDate, bookingTime, diners, occasion, seatingOption } =
    value
  return { id, bookingDate, bookingTime, diners, occasion, seatingOption }
}

export function readBookings() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(value) ? value.map(toReceipt).filter(Boolean) : []
  } catch {
    return []
  }
}

export function saveBooking(data) {
  const receipt = toReceipt({
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  })
  if (!receipt) return false
  try {
    const bookings = readBookings()
    if (
      bookings.some(
        (booking) =>
          booking.bookingDate === receipt.bookingDate &&
          booking.bookingTime === receipt.bookingTime,
      )
    )
      return false
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...bookings, receipt]),
    )
    return true
  } catch {
    return false
  }
}

export function clearBookings() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

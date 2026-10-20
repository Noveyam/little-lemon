import BookingForm from './BookingForm'
import BookingSlot from './BookingSlot'
import { useReducer, useState, useEffect } from 'react'
import { fetchAPI, submitAPI } from '../api'
import { localDate, parseDate } from '../booking'
import { readBookings, STORAGE_KEY } from '../bookingStorage'
import { useNavigate } from 'react-router-dom'

export const initializeTimes = () => fetchAPI(parseDate(localDate()))
export const updateTimes = (state, action) => {
  if (action.type !== 'UPDATE_TIMES') return state
  const date = parseDate(action.payload)
  return date ? fetchAPI(date) : []
}

function BookingPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState(localDate)
  const [bookings, setBookings] = useState(readBookings)
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes,
  )

  function changeDate(action) {
    setSelectedDate(action.payload)
    setBookings(readBookings())
    setError('')
    dispatch(action)
  }

  useEffect(() => {
    const refresh = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        setBookings(readBookings())
        dispatch({ type: 'UPDATE_TIMES', payload: selectedDate })
      }
    }
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [selectedDate])

  function submitForm(formData) {
    if (submitAPI(formData)) {
      const saved = readBookings()
      navigate('/reservation-confirmation', {
        state: { id: saved[saved.length - 1].id },
      })
    } else {
      setBookings(readBookings())
      dispatch({ type: 'UPDATE_TIMES', payload: formData.bookingDate })
      setError(
        'Your demo reservation was not saved. The time may have been booked in this browser, or browser storage may be unavailable. Choose an available time and try again.',
      )
    }
  }
  const bookedTimes = bookings
    .filter((booking) => booking.bookingDate === selectedDate)
    .map((booking) => booking.bookingTime)
  const slots = [...new Set([...availableTimes, ...bookedTimes])].sort()
  const date = parseDate(selectedDate)

  return (
    <div className="booking-section">
      <p className="eyebrow">A SEAT AT OUR TABLE</p>
      <h1>Make yourself at home.</h1>
      <p>Choose a date, bring your people, and leave the cooking to us.</p>
      <p className="demo-note">
        Portfolio demo — no restaurant booking is made. Demo reservations are
        saved in this browser, without your name or email.
      </p>
      {error && <p role="alert">{error}</p>}
      <section className="slot-panel" aria-labelledby="slot-heading">
        <h2 id="slot-heading">
          Table times
          {date
            ? ` for ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
            : ''}
        </h2>
        <p>
          Choose an available time in the form below. Saved demo bookings block
          that time in this browser only.
        </p>
        <ul className="booking-slots">
          {slots.map((time) => (
            <BookingSlot
              key={time}
              time={time}
              booked={bookedTimes.includes(time)}
            />
          ))}
        </ul>
        {slots.length === 0 && (
          <p>No times to display. Choose another date below.</p>
        )}
      </section>
      <BookingForm
        availableTimes={availableTimes}
        submitForm={submitForm}
        dispatch={changeDate}
      />
    </div>
  )
}
export default BookingPage

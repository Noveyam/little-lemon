import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { parseDate } from '../booking'
import { readBookings, clearBookings } from '../bookingStorage'
function BookingConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const bookings = readBookings()
  const data = state?.id
    ? bookings.find((booking) => booking.id === state.id)
    : bookings[bookings.length - 1]
  if (!data)
    return (
      <section className="message-page">
        <h1>No reservation to display</h1>
        <p>Start with the reservation form to create a demo booking.</p>
        <Link className="button" to="/reservations">
          Reserve a table
        </Link>
      </section>
    )
  const date = parseDate(data.bookingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const reset = () => {
    if (clearBookings()) navigate('/reservations', { replace: true })
    else setError('Browser storage could not be cleared. Please try again.')
  }
  return (
    <section className="message-page">
      <p className="eyebrow">ALL SET</p>
      <h1>Your demo reservation is confirmed.</h1>
      <p className="demo-note">
        This is a portfolio demo. No restaurant booking or email has been sent.
      </p>
      <p>
        Your reservation details are saved in this browser. Your name and email
        were not saved.
      </p>
      <h2>Booking Details</h2>
      <dl className="booking-details">
        <dt>Date</dt>
        <dd>{date}</dd>
        <dt>Time</dt>
        <dd>{data.bookingTime}</dd>
        <dt>Guests</dt>
        <dd>{data.diners}</dd>
        <dt>Seating</dt>
        <dd>{data.seatingOption}</dd>
        <dt>Occasion</dt>
        <dd>{data.occasion}</dd>
      </dl>
      <div className="confirmation-actions">
        <Link className="button" to="/">
          Return Home
        </Link>
        <Link className="button button-secondary" to="/reservations">
          Book another table
        </Link>
        <button className="text-button" onClick={reset}>
          Reset demo bookings
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
    </section>
  )
}
export default BookingConfirmation

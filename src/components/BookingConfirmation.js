import { useLocation, Link } from 'react-router-dom'
import { parseDate } from '../booking'
function BookingConfirmation() {
  const { state: data } = useLocation()
  if (!data || !parseDate(data.bookingDate))
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
  return (
    <section className="message-page">
      <p className="eyebrow">ALL SET</p>
      <h1>Your demo reservation is confirmed.</h1>
      <p className="demo-note">
        This is a portfolio demo. No restaurant booking has been made.
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
      <Link className="button" to="/">
        Return Home
      </Link>
    </section>
  )
}
export default BookingConfirmation

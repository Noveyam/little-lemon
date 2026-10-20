function BookingSlot({ time, booked }) {
  return (
    <li className={`booking-slot ${booked ? 'is-booked' : ''}`}>
      <span>{time}</span>
      <span>{booked ? 'Booked in this browser' : 'Available'}</span>
    </li>
  )
}
export default BookingSlot

import BookingForm from './BookingForm'
import { useReducer, useState } from 'react'
import { fetchAPI, submitAPI } from '../api'
import { localDate, parseDate } from '../booking'
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
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes,
  )
  function submitForm(formData) {
    if (submitAPI(formData)) {
      navigate('/reservation-confirmation', { state: formData })
    } else {
      setError('We could not save your demo reservation. Please try again.')
    }
  }
  return (
    <div className="booking-section">
      <p className="eyebrow">A SEAT AT OUR TABLE</p>
      <h1>Make yourself at home.</h1>
      <p>Choose a date, bring your people, and leave the cooking to us.</p>
      <p className="demo-note">
        Portfolio demo — reservations are simulated. No restaurant booking is
        made.
      </p>
      {error && <p role="alert">{error}</p>}
      <BookingForm
        availableTimes={availableTimes}
        submitForm={submitForm}
        dispatch={dispatch}
      />
    </div>
  )
}
export default BookingPage

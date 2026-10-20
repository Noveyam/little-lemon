import chefs from '../assets/Mario and Adrian b.jpg'
import restaurant from '../assets/restaurant.jpg'
import { useState } from 'react'
import { localDate, validateBooking } from '../booking'

function BookingForm({
  availableTimes = [],
  dispatch = () => {},
  submitForm = () => {},
}) {
  const [inputs, setInputs] = useState({
    bookingDate: localDate(),
    bookingTime: '',
    diners: '',
    occasion: 'none',
    seatingOption: 'standard',
  })
  const [errors, setErrors] = useState({})
  const change = (event) => {
    const { name, value } = event.target
    setInputs((previous) => ({
      ...previous,
      [name]: value,
      ...(name === 'bookingDate' ? { bookingTime: '' } : {}),
    }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    if (name === 'bookingDate')
      dispatch({ type: 'UPDATE_TIMES', payload: value })
  }
  const error = (name) =>
    errors[name] && (
      <p id={`${name}-error`} className="error-text">
        {errors[name]}
      </p>
    )
  const accessibility = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validateBooking(inputs, availableTimes)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0)
      submitForm({ ...inputs, diners: Number(inputs.diners) })
  }
  return (
    <form
      id="reservation-details"
      aria-label="Reservation Details"
      onSubmit={submit}
      noValidate
    >
      <div className="reservation-section">
        <section
          className="reservation-fields"
          aria-labelledby="booking-heading"
        >
          <h2 id="booking-heading">Reservation Details</h2>
          <div>
            <label htmlFor="bookingDate">Date</label>
            <input
              id="bookingDate"
              name="bookingDate"
              type="date"
              required
              min={localDate()}
              value={inputs.bookingDate}
              onChange={change}
              {...accessibility('bookingDate')}
            />
            {error('bookingDate')}
          </div>
          <div>
            <label htmlFor="bookingTime">Time</label>
            <select
              id="bookingTime"
              name="bookingTime"
              required
              value={inputs.bookingTime}
              onChange={change}
              {...accessibility('bookingTime')}
            >
              <option value="">Choose a time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {availableTimes.length === 0 && (
              <p role="status">
                No times available. Please choose another date.
              </p>
            )}
            {error('bookingTime')}
          </div>
          <div>
            <label htmlFor="diners">Number of Diners</label>
            <input
              id="diners"
              name="diners"
              type="number"
              required
              min="1"
              max="12"
              step="1"
              placeholder="1–12 guests"
              value={inputs.diners}
              onChange={change}
              {...accessibility('diners')}
            />
            {error('diners')}
          </div>
          <div>
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              value={inputs.occasion}
              onChange={change}
              {...accessibility('occasion')}
            >
              <option value="none">None</option>
              <option value="birthday">Birthday</option>
              <option value="engagement">Engagement</option>
              <option value="anniversary">Anniversary</option>
            </select>
            {error('occasion')}
          </div>
          <fieldset>
            <legend>Seating Options</legend>
            {['standard', 'outside'].map((value) => (
              <label className="radio-label" key={value}>
                <input
                  type="radio"
                  name="seatingOption"
                  value={value}
                  checked={inputs.seatingOption === value}
                  onChange={change}
                />
                {value === 'standard' ? 'Standard' : 'Outside'}
              </label>
            ))}
            {error('seatingOption')}
          </fieldset>
          {Object.keys(errors).some((key) => errors[key]) && (
            <p role="alert">
              Please check the highlighted reservation details.
            </p>
          )}
          <button className="button" type="submit">
            Reserve Table <span aria-hidden="true">→</span>
          </button>
        </section>
        <aside
          className="booking-photos"
          aria-label="A look inside Little Lemon"
        >
          <img alt="Two chefs at the pizza oven" src={chefs} />
          <img alt="Outdoor seating at Little Lemon" src={restaurant} />
          <p>
            Good food. Good company.
            <br />A little Mediterranean sunshine.
          </p>
        </aside>
      </div>
    </form>
  )
}
export default BookingForm

import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import BookingForm from './components/BookingForm'
import { initializeTimes, updateTimes } from './components/BookingPage'
import { fetchAPI, submitAPI } from './api'
import { localDate, parseDate, validateBooking } from './booking'
import { STORAGE_KEY, readBookings, saveBooking } from './bookingStorage'

beforeEach(() => {
  window.localStorage.clear()
})
afterEach(() => {
  jest.restoreAllMocks()
})

const futureDate = '2099-06-15'
const times = fetchAPI(parseDate(futureDate))
const validBooking = {
  bookingDate: futureDate,
  bookingTime: times[0],
  diners: 4,
  occasion: 'birthday',
  seatingOption: 'outside',
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex@example.com',
}

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

test('initializeTimes returns today’s simulated availability', () => {
  expect(initializeTimes()).toEqual(fetchAPI(parseDate(localDate())))
})

test('date reducer refreshes availability and handles cleared dates', () => {
  expect(
    updateTimes([], { type: 'UPDATE_TIMES', payload: futureDate }),
  ).toEqual(times)
  expect(updateTimes(times, { type: 'UPDATE_TIMES', payload: '' })).toEqual([])
  expect(updateTimes(times, { type: 'OTHER' })).toBe(times)
})

test('date formatting uses the local calendar and rejects impossible dates', () => {
  expect(localDate(new Date(2026, 9, 19, 23, 30))).toBe('2026-10-19')
  expect(parseDate('2026-02-30')).toBeNull()
  expect(parseDate('')).toBeNull()
})

test.each(['', '0', '13', '2.5', '-1'])(
  'rejects invalid guest count %s',
  (diners) => {
    expect(
      validateBooking({ ...validBooking, diners }, times).diners,
    ).toBeTruthy()
  },
)

test('rejects past dates, unavailable times, and unsupported options', () => {
  expect(
    validateBooking({ ...validBooking, bookingDate: '2000-01-01' }, times)
      .bookingDate,
  ).toBeTruthy()
  expect(
    validateBooking({ ...validBooking, bookingTime: '02:00' }, times)
      .bookingTime,
  ).toBeTruthy()
  expect(
    validateBooking({ ...validBooking, occasion: 'invalid' }, times).occasion,
  ).toBeTruthy()
  expect(
    validateBooking({ ...validBooking, seatingOption: 'invalid' }, times)
      .seatingOption,
  ).toBeTruthy()
})

test('demo API validates submissions instead of always accepting them', () => {
  expect(submitAPI(validBooking)).toBe(true)
  expect(submitAPI({ ...validBooking, bookingTime: '02:00' })).toBe(false)
  expect(submitAPI(null)).toBe(false)
})

test('empty form shows associated errors and does not submit', () => {
  const submit = jest.fn()
  render(<BookingForm availableTimes={times} submitForm={submit} />)
  fireEvent.click(screen.getByRole('button', { name: /Reserve Table/ }))
  expect(submit).not.toHaveBeenCalled()
  expect(screen.getByLabelText('Time')).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByLabelText('Number of Diners')).toHaveAccessibleDescription(
    'Enter a whole number from 1 to 12.',
  )
  expect(screen.getByRole('alert')).toBeInTheDocument()
})

test('changing date clears the previously selected time', () => {
  const dispatch = jest.fn()
  const submit = jest.fn()
  render(
    <BookingForm
      availableTimes={times}
      dispatch={dispatch}
      submitForm={submit}
    />,
  )
  fireEvent.change(screen.getByLabelText('Time'), {
    target: { value: times[0] },
  })
  fireEvent.change(screen.getByLabelText('Date'), {
    target: { value: futureDate },
  })
  expect(dispatch).toHaveBeenCalledWith({
    type: 'UPDATE_TIMES',
    payload: futureDate,
  })
  expect(screen.getByLabelText('Time')).toHaveValue('')
})

test('complete reservation navigates with correct occasion and seating', () => {
  renderApp('/reservations')
  fireEvent.change(screen.getByLabelText('Date'), {
    target: { value: futureDate },
  })
  fireEvent.change(screen.getByLabelText('Time'), {
    target: { value: times[0] },
  })
  fireEvent.change(screen.getByLabelText('Number of Diners'), {
    target: { value: '4' },
  })
  fireEvent.change(screen.getByLabelText('Occasion'), {
    target: { value: 'birthday' },
  })
  fireEvent.change(screen.getByLabelText('First name (required)'), {
    target: { value: 'Alex' },
  })
  fireEvent.change(screen.getByLabelText('Last name (required)'), {
    target: { value: 'Rivera' },
  })
  fireEvent.change(screen.getByLabelText('Email (required)'), {
    target: { value: 'alex@example.com' },
  })
  fireEvent.click(screen.getByLabelText('Outside'))
  fireEvent.submit(screen.getByRole('form', { name: 'Reservation Details' }))
  expect(
    screen.getByRole('heading', {
      name: 'Your demo reservation is confirmed.',
    }),
  ).toBeInTheDocument()
  expect(screen.getByText('June 15, 2099')).toBeInTheDocument()
  expect(screen.getByText('birthday', { exact: true })).toBeInTheDocument()
  expect(screen.getByText('outside', { exact: true })).toBeInTheDocument()
})

test('empty availability displays a useful message and cannot submit', () => {
  const submit = jest.fn()
  render(<BookingForm submitForm={submit} />)
  expect(screen.getByRole('status')).toHaveTextContent('No times available')
  fireEvent.submit(screen.getByRole('form'))
  expect(submit).not.toHaveBeenCalled()
})

test.each([
  ['/reservation-confirmation', 'No reservation to display'],
  ['/missing', 'Page not found'],
  ['/login', 'No account needed.'],
  ['/order_online', 'A taste of Little Lemon'],
])('direct route %s renders safely', (path, heading) => {
  renderApp(path)
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
})

test('mobile navigation reports its state and closes after route selection', () => {
  renderApp()
  const toggle = screen.getByRole('button', { name: 'Toggle navigation' })
  fireEvent.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  fireEvent.click(
    screen
      .getByRole('navigation', { name: 'Main navigation' })
      .querySelector('a[href="/reservations"]'),
  )
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(
    screen.getByRole('heading', { name: 'Make yourself at home.' }),
  ).toBeInTheDocument()
})

test.each([
  ['firstName', ''],
  ['firstName', '   '],
  ['firstName', 'a'.repeat(81)],
  ['lastName', ''],
  ['lastName', '   '],
  ['lastName', 'a'.repeat(81)],
  ['email', ''],
  ['email', 'invalid'],
  ['email', 'a@'],
  ['email', 'a b@example.com'],
])('rejects missing or invalid customer detail %s', (field, value) => {
  expect(
    validateBooking({ ...validBooking, [field]: value }, times)[field],
  ).toBeTruthy()
})

test('customer details are required and errors are associated with fields', () => {
  render(<BookingForm availableTimes={times} />)
  fireEvent.submit(screen.getByRole('form'))
  expect(screen.getByLabelText('First name (required)')).toBeRequired()
  expect(screen.getByLabelText('Last name (required)')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  expect(screen.getByLabelText('Email (required)')).toHaveAccessibleDescription(
    /Enter a valid email address/,
  )
})

test('saving a demo booking persists only its receipt and consumes its slot', () => {
  expect(submitAPI(validBooking)).toBe(true)
  const [receipt] = readBookings()
  expect(receipt).toMatchObject({
    bookingDate: futureDate,
    bookingTime: times[0],
    diners: 4,
  })
  expect(receipt).not.toHaveProperty('firstName')
  expect(receipt).not.toHaveProperty('lastName')
  expect(receipt).not.toHaveProperty('email')
  expect(window.localStorage.getItem(STORAGE_KEY)).not.toContain(
    'alex@example.com',
  )
  expect(fetchAPI(parseDate(futureDate))).not.toContain(times[0])
  expect(submitAPI(validBooking)).toBe(false)
  expect(readBookings()).toHaveLength(1)
})

test('confirmation survives a new app render and reset releases the slot', () => {
  expect(submitAPI(validBooking)).toBe(true)
  renderApp('/reservation-confirmation')
  expect(
    screen.getByRole('heading', {
      name: 'Your demo reservation is confirmed.',
    }),
  ).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Reset demo bookings' }))
  expect(
    screen.getByRole('heading', { name: 'Make yourself at home.' }),
  ).toBeInTheDocument()
  expect(readBookings()).toEqual([])
  expect(fetchAPI(parseDate(futureDate))).toContain(times[0])
})

test('slot list and select share the same date-dependent state', () => {
  expect(submitAPI(validBooking)).toBe(true)
  renderApp('/reservations')
  fireEvent.change(screen.getByLabelText('Date'), {
    target: { value: futureDate },
  })
  expect(
    screen.getByText('Booked in this browser', { exact: true }),
  ).toBeInTheDocument()
  const selectValues = Array.from(
    screen.getByLabelText('Time').options,
    (option) => option.value,
  )
  expect(selectValues).not.toContain(times[0])
  expect(selectValues).toContain(times[1])
})

test('corrupt or malformed stored data cannot crash the app', () => {
  window.localStorage.setItem(STORAGE_KEY, '{broken')
  expect(readBookings()).toEqual([])
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      { bookingDate: 'not-a-date' },
      null,
      { id: 'x', bookingDate: futureDate },
    ]),
  )
  expect(readBookings()).toEqual([])
  renderApp('/reservation-confirmation')
  expect(
    screen.getByRole('heading', { name: 'No reservation to display' }),
  ).toBeInTheDocument()
})

test('storage failure does not report a successful booking', () => {
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Storage unavailable')
  })
  expect(submitAPI(validBooking)).toBe(false)
  expect(readBookings()).toEqual([])
})

test('another tab booking refreshes the visible availability', () => {
  renderApp('/reservations')
  fireEvent.change(screen.getByLabelText('Date'), {
    target: { value: futureDate },
  })
  expect(saveBooking(validBooking)).toBe(true)
  fireEvent(window, new StorageEvent('storage', { key: STORAGE_KEY }))
  expect(
    screen.getByText('Booked in this browser', { exact: true }),
  ).toBeInTheDocument()
  expect(
    Array.from(screen.getByLabelText('Time').options, (option) => option.value),
  ).not.toContain(times[0])
})

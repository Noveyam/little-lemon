import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './Pages/Booking';
import {initializeTimes, updateTimes} from './Pages/Main';
import { BrowserRouter } from 'react-router-dom';

describe('BookingForm', () => {

  const availableTimes = ['17:00', '18:00', '19:00', '20:00'];
  const setAvailableTimes = jest.fn();
  const submitForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form fields', () => {
    render(<BrowserRouter><BookingForm availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} submitForm={submitForm} /></BrowserRouter>);
    expect(screen.getByLabelText('Choose Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of guests')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeInTheDocument();
  });

  it('should show error message if date is invalid', async () => {
    render(<BrowserRouter><BookingForm availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} submitForm={submitForm} /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText('Choose Date'), { target: { value: 'invalid-date' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Make Your Reservation' }));
    expect(await screen.findByText('Please choose a valid date')).toBeInTheDocument();
  });

  it('should show error message if number of guests is invalid', async () => {
    render(<BrowserRouter><BookingForm availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} submitForm={submitForm} /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '0' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Make Your Reservation' }));
    expect(await screen.findByText('Number of guests should be between 1 and 10')).toBeInTheDocument();
  });

  it('should call submitForm with form data when submitted with valid data', () => {
    render(<BrowserRouter><BookingForm availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} submitForm={submitForm} /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText('Choose Date'), { target: { value: '2023-05-01' } });
    fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '4' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Make Your Reservation' }));
    expect(submitForm).toHaveBeenCalledWith({
      date: '2023-05-01',
      time: '17:00',
      guests: 4,
      occasion: 'Birthday',
    });
  });

  test('Renders the BookingForm heading', () => {
    render(<BrowserRouter><BookingForm /></BrowserRouter>);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
  })

  test('should render the form with all the required input fields', () => {
    render(<BrowserRouter><BookingForm /></BrowserRouter>);
    expect(screen.getByLabelText('Choose Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of guests')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
  });

  test('should update the date when the date input field is changed', () => {
    render(<BrowserRouter><BookingForm /></BrowserRouter>);
    const newDate = '2023-05-05';
    const dateInput = screen.getByLabelText('Choose Date');
    fireEvent.change(dateInput, { target: { value: newDate } });
    expect(dateInput.value).toBe(newDate);
  });

  test('should update the guests when the guests input field is changed', () => {
    render(<BrowserRouter><BookingForm /></BrowserRouter>);
    const newGuests = 5;
    const guestsInput = screen.getByLabelText('Number of guests');
    fireEvent.change(guestsInput, { target: { value: newGuests } });
    expect(guestsInput.value).toBe(String(newGuests));
  });

  test('should update the occasion when the occasion input field is changed', () => {
    render(<BrowserRouter><BookingForm /></BrowserRouter>);
    const newOccasion = 'Anniversary';
    const occasionInput = screen.getByLabelText('Occasion');
    fireEvent.change(occasionInput, { target: { value: newOccasion } });
    expect(occasionInput.value).toBe(newOccasion);
  });

});

test("initializeTimes returns an array of available times", () => {
  expect(initializeTimes()).toEqual([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ]);
});

// Unit test for the updateTimes function
test("updateTimes returns the same value that is provided in the state", () => {
  const state = ["10:00", "11:00", "12:00"];
  const action = { type: "UPDATE_TIMES", payload: state };
  expect(updateTimes(state, action)).toEqual(state);
});

test('initializeTimes function returns a non-empty array', async () => {
  const result = await initializeTimes();
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
});
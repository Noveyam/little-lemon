import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingForm from './Pages/Booking';
import {initializeTimes, updateTimes} from './Pages/Main';

describe('BookingForm', () => {
  test('Renders the BookingForm heading', () => {
    render(<BookingForm />);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
})
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





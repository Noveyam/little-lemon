import { render, screen, fireEvent } from "@testing-library/react";
import ReservationForm from "./Pages/ReservationForm";
import { initializeTimes, updateTimes } from './Pages/Main.js';

describe("ReservationForm", () => {
  it("updates available times when date is selected", () => {
    // Render the ReservationForm component
    render(<ReservationForm availableTimes={["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]} setAvailableTimes={jest.fn()} />);
    // Select the date input
    const dateInput = screen.getByLabelText("Choose Date");

    // Simulate changing the date to 2022-04-20
    fireEvent.change(dateInput, { target: { value: "2022-04-20" } });

  });
});

describe('initializeTimes', () => {
  it('should return an array of times starting from 18:00 to 21:00', () => {
    const result = initializeTimes();
    expect(result).toEqual(['18:00', '19:00', '20:00', '21:00']);
  });
});

describe('updateTimes', () => {
  it('should return the same state value', () => {
    const state = ['18:00', '19:00', '20:00', '21:00'];
    const action = { type: 'UPDATE_TIMES', payload: ['18:00', '19:00', '20:00', '21:00'] };
    const result = updateTimes(state, action);
    expect(result).toEqual(state);
  });
});

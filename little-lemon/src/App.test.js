import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BookingForm from './Pages/Booking';

describe('BookingForm', () => {
  const mockSetAvailableTimes = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders all input fields', () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        setAvailableTimes={mockSetAvailableTimes}
      />
    );

    expect(screen.getByLabelText('Choose Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of guests')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
    expect(screen.getByText('Make Your Reservation')).toBeInTheDocument();
  });

  test('handles form submission', () => {
    const mockSetAvailableTimes = jest.fn();
    console.log = jest.fn(); // Add this line to mock console.log
    render(<BookingForm setAvailableTimes={mockSetAvailableTimes} />);
    const dateInput = screen.getByLabelText('Choose Date');
    const timeInput = screen.getByLabelText('Choose Time');
    const guestsInput = screen.getByLabelText('Number of guests');
    const occasionInput = screen.getByLabelText('Occasion');
    fireEvent.change(dateInput, { target: { value: '2023-05-01' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionInput, { target: { value: 'Anniversary' } });
    fireEvent.click(screen.getByText('Make Your Reservation'));
    expect(mockSetAvailableTimes).toHaveBeenCalledWith(['18:00', '19:00', '20:00', '21:00']);
    expect(console.log).toHaveBeenCalledWith('Reservation date: ', '2023-05-01');
    expect(console.log).toHaveBeenCalledWith('Reservation time: ', '18:00');
  });
});

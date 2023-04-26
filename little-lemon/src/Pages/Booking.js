import React, { useState, useReducer, useEffect } from 'react';

const BookingForm = ({ availableTimes, setAvailableTimes }) => {
  const [resDate, setResDate] = useState(new Date().toISOString().substring(0, 10));
  const [resTime, setResTime] = useState(
    availableTimes && availableTimes.length > 0 ? availableTimes[0] : '17:00'
  );
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  const initializeTimes = (times) => {
    return times;
  };

  const updateTimes = (state, action) => {
    switch (action.type) {
      case 'UPDATE_TIMES':
        return action.payload;
      default:
        return state;
    }
  };

  const [availableTimesState, dispatch] = useReducer(
    updateTimes,
    availableTimes,
    initializeTimes
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation date: ", resDate);
    console.log("Reservation time: ", resTime);
    console.log("Number of guests: ", guests);
    console.log("Occasion: ", occasion);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setResDate(newDate);
    const newTimes = ["18:00", "19:00", "20:00", "21:00"]; // generate new available times based on the new date
    if (newTimes.length === 0) {
      // if there are no available times for the new date, reset the time to the default time
      setResTime('17:00');
    } else {
      dispatch({ type: 'UPDATE_TIMES', payload: newTimes });
      setAvailableTimes(newTimes); // update the available times with the new array of times
      setResTime(newTimes[0]); // reset the selected time to the first available time
    }
  };

  useEffect(() => {
    const newTimes = ["18:00", "19:00", "20:00", "21:00"]; // generate new available times based on the default date
    setAvailableTimes(newTimes);
    dispatch({ type: 'UPDATE_TIMES', payload: newTimes });
  }, [setAvailableTimes]);
  return (
    <form className="reserve-form" onSubmit={handleSubmit}>
      <label htmlFor="date">Choose Date</label>
      <input
        type="date"
        id="date"
        value={resDate}
        onChange={handleDateChange}
      />
      <label htmlFor="time">Choose Time</label>
      <select
        type="time"
        id="time"
        value={resTime}
        onChange={(e) => setResTime(e.target.value)}
      >
        {availableTimesState &&
          availableTimesState.map((time) => <option key={time}>{time}</option>)}
      </select>
      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
      />
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>
      <input type="submit" value="Make Your Reservation" />
    </form>
  );
};

export default BookingForm;

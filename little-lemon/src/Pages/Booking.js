import React, { useState, useReducer } from 'react';

const BookingForm = ({ availableTimes, setAvailableTimes, submitForm }) => {
  const [resDate, setResDate] = useState(new Date().toISOString().substring(0, 10));
  const [resTime, setResTime] = useState(
    availableTimes && availableTimes.length > 0 ? availableTimes[0] : '17:00'
  );
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  const fetchData = async (date) => {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js?date=${date}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const initializeTimes = async () => {
    try {
      const times = await fetchData(resDate);
      return times || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const updateTimes = async (state = [], action) => {
    switch (action.type) {
      case "UPDATE_TIMES":
        try {
          const response = await fetch(`https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js?date=${action.payload}`);
          const data = await response.json();
          return Array.isArray(data) ? data : initializeTimes();
        } catch (error) {
          console.error(error);
          return initializeTimes();
        }
      default:
        return state;
    }
  };

  const [availableTimesState, setAvailableTimesState] = useReducer(
    updateTimes,
    [],
    initializeTimes,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        // ...
      };
      await submitForm(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setResDate(newDate);
    const times = await fetchData(newDate);
    setAvailableTimesState(times);
    setResTime(times && times.length > 0 ? times[0] : "17:00");
  };

  return (
    <form className="reserve-form" onSubmit={handleSubmit}>
      <h1>Book Now</h1>
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
        {Array.isArray(availableTimesState) &&
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

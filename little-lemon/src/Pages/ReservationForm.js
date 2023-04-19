import React, { useState, useReducer } from "react";

const ReservationForm = ({ setBooking, availableTimes }) => {
  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: "",
  });

  // Update available times based on selected date
  const updateTimes = (state, action) => {
    switch (action.type) {
      case "update":
        // For now, return the same available times regardless of the date
        return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
      default:
        throw new Error();
    }
  };

  const [timesState, dispatch] = useReducer(updateTimes, availableTimes);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Dispatch action to update available times based on selected date
    dispatch({ type: "update", date: reservation.date });
  };

  return (
    <form className="reserve-form" style={{ display: "grid", maxWidth: "200px", gap: "20px" }}>
      <label htmlFor="res-date">Choose Date</label>
      <input
        type="date"
        id="res-date"
        name="date"
        value={reservation.date}
        onChange={handleChange}
      />
      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        name="time"
        value={reservation.time}
        onChange={handleChange}
      >
        {/* Use updated available times */}
        {timesState && timesState.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </select>
      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        name="guests"
        value={reservation.guests}
        onChange={handleChange}
      />
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        name="occasion"
        value={reservation.occasion}
        onChange={handleChange}
      >
        <option value="">Select an occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      <input type="submit" value="Make Your reservation" onClick={handleSubmit} />
    </form>
  );
};

export default ReservationForm;

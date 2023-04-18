import React, { useState } from 'react';

const ReservationForm = ({availableTimes, setAvailableTimes}) => {
  const [resDate, setResDate] = useState(new Date().toISOString().substr(0, 10));
  const [resTime, setResTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date: resDate,
      time: resTime,
      guests,
      occasion,
    };
    console.log(formData);
    setResDate(new Date().toISOString().substr(0, 10));
    setResTime(availableTimes[0]);
    setGuests(1);
    setOccasion('Birthday');
  };

  return (
    <form onSubmit={handleSubmit} className="reserve-form">
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={resDate}
        onChange={(e) => setResDate(e.target.value)}
      />
      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={resTime}
        onChange={(e) => setResTime(e.target.value)}
      >
        {availableTimes.map((time) => (
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

export default ReservationForm;

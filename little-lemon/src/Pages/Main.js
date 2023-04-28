import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookingForm from "./Booking";

function initializeTimes() {
  return [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
}

function updateTimes(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES":
      return action.payload;
    default:
      return state;
  }
}

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const navigate = useNavigate();

  const setAvailableTimes = (times) => {
    dispatch({ type: 'UPDATE_TIMES', payload: times });
  };

  const submitForm = async (formData) => {
    try {
      const response = await fetch('submitAPI', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        navigate('/booking-confirmed');
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main-content">
      <section className="main-container">
        <h1>Little Lemon</h1>
        <h4>Chicago</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <BookingForm availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} submitForm={submitForm}/>
        <Link to="/reservations">
          <button className="reserve-button">Reserve a Table</button>
        </Link>
      </section>
      <figure className="bread">
        <img src="./images/restauranfood.jpg" alt="bread on plate"></img>
      </figure>
    </main>
  );
}

export default Main;
export {initializeTimes, updateTimes};

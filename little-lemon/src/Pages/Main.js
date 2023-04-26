import React, { useReducer } from "react";
import { Link } from "react-router-dom";
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

  return (
    <main className="main-content">
      <section className="main-container">
        <h1>Little Lemon</h1>
        <h4>Chicago</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <BookingForm
          availableTimes={availableTimes}
          setAvailableTimes={dispatch}
        />
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

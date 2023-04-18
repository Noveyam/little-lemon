import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {ReservationForm} from "";

function Main() {
    const [availableTimes, setAvailableTimes] = useState([
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
      ]);
    return (
        <main className="main-content">
            <section className="main-container">
                <h1>Little Lemon</h1>
                <h4>Chicago</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <ReservationForm availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} />
                <Link to="/reservations"><button className="reserve-button">Reserve a Table</button></Link>
            </section>
                <figure className="bread">
                    <img src="./images/restauranfood.jpg" alt="bread on plate"></img>
                </figure>
        </main>
    )
}

export default Main;

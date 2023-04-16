import React from "react";
import {Link} from 'react-router-dom';

function Main() {
    return (
        <main className="main-content">
            <section className="main-container">
                <h1>Little Lemon</h1>
                <h4>Chicago</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Link to="/reservations"><button className="reserve-button">Reserve a Table</button></Link>
            </section>
                <figure className="bread">
                    <img src="./images/restauranfood.jpg" alt="bread on plate"></img>
                </figure>
        </main>
    )
}

export default Main;

import React from "react";

function Main() {
    return (
        <main className="main-content">
            <div className="main-container">
                <div className="main-item header">
                    <h1>Little Lemon</h1>
                    <h4>Chicago</h4>
                </div>
                <div className="main-item content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button className="reserve button">Reserve a Table</button>
                </div>
                <div className="main-item image">
                    <img className="bread" src="./images/restauranfood.jpg" alt="bread on plate"></img>
                </div>
            </div>
        </main>
    )
}

export default Main;

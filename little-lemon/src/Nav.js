import React from "react";

function Navbar() {
    return (
        <nav className="navbar">
            <figure>
                <img className="logo" src="./images/logo.jpg" alt="logo"></img>
            </figure>
            <ul className="navigation">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">Reservations</a></li>
                <li><a href="#">Order Online</a></li>
                <li><a href="#">Logins</a></li>
            </ul>
            <figure>
                <img className="hamburger" src="./images/hamburger.jpg"></img>
            </figure>
        </nav>
    );
}

export default Navbar;
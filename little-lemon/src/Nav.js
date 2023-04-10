import React from "react";
import {Routes, Route, Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <figure>
                <img className="logo" src="./images/logo.jpg" alt="logo"></img>
            </figure>
            <ul className="navigation">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/menu">Menu</Link></li>
                <li><Link href="/reservations">Reservations</Link></li>
                <li><Link href="/order">Order Online</Link></li>
                <li><Link href="/login">Login</Link></li>
            </ul>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/order" element={<OrderOnline />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </nav>
    );
}

// Example component for Home
function Home() {
    return
}

// Example component for About
function About() {
    return <h1>About Page</h1>;
}

// Example component for Menu
function Menu() {
    return <h1>Menu Page</h1>;
}

// Example component for Reservations
function Reservations() {
    return <h1>Reservations Page</h1>;
}

// Example component for Order Online
function OrderOnline() {
    return <h1>Order Online Page</h1>;
}

// Example component for Logins
function Login() {
    return <h1>Login Page</h1>;
}

export default Navbar;
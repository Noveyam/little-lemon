import React from "react";
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer-content">
            <div className="footer-container">
            <figure className="footer-column">
                <img src="./images/footer-logo.jpg" alt="logo"></img>
            </figure>
            <div className="footer-column">
                <h3>Doormat Navigation</h3>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/menu">Menu</Link></li>
                    <li><Link href="/reservations">Reservations</Link></li>
                    <li><Link href="/order">Order Online</Link></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Contact</h3>
                <ul>
                    <li>Address</li>
                    <li>Phone Number</li>
                    <li>Email</li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Social Media Links</h3>
                <ul>
                    <li><a href="http://www.facebook.com">Facebook</a></li>
                    <li><a href="http://www.youtube.com">Youtube</a></li>
                    <li><a href="http://www.twitter.com">Twitter</a></li>
                </ul>
            </div>
            </div>
        </footer>
    )
}

export default Footer;
import React from "react";

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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Menu</a></li>
                    <li><a href="#">Reservations</a></li>
                    <li><a href="#">Order Online</a></li>
                    <li><a href="#">Logins</a></li>
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
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Youtube</a></li>
                    <li><a href="#">Twitter</a></li>
                </ul>
            </div>
            </div>
        </footer>
    )
}

export default Footer;
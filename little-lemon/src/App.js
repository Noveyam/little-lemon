import './App.css';
import Home from './Pages/Home.js';
import Specials from './Pages/Specials';
import CustomerReviews from './Pages/CustomerReviews';
import Chicago from './Pages/Chicago.js';
import BookingForm from './Pages/Booking';
import User from './Pages/Login.js';
import Footer from './Pages/Footer.js';
import ConfirmedBooking from './Pages/ConfirmedBooking';
import {Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <>
    <nav className="navbar">
      <Link to="/">
      <figure>
        <img className="logo" src="./images/logo.jpg" alt="logo"></img>
        </figure>
        </Link>
        <ul className="navigation">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/order">Order Online</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Chicago />} />
      <Route path="/menu" element={<Specials />}/>
      <Route path="/reservations" element={<BookingForm />} />
      <Route path="/order" element={<CustomerReviews />} />
      <Route path="/confirmbooking" element={<ConfirmedBooking />}/>
      <Route path="/login" element={<User />} />
    </Routes>
    <Footer />
    </>
    );
}

export default App;

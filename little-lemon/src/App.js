import './App.css';
import Home from './Pages/Home.js';
import Main from './Pages/Main.js';
import Specials from './Pages/Specials';
import CustomerReviews from './Pages/CustomerReviews';
import Footer from './Pages/Footer.js';
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
      <Route path="/about" element={<Main />} />
      <Route path="/menu" element={<Specials />}/>
      <Route path="/reservations" element={<Specials />} />
      <Route path="/order" element={<CustomerReviews />} />
      <Route path="/login" element={<Footer />} />
    </Routes>
    </>
    );
}

export default App;

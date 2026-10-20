import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import BookingPage from './components/BookingPage'
import BookingConfirmation from './components/BookingConfirmation'
import Homepage from './components/Homepage'
import Header from './components/Header'
import Footer from './components/Footer'
import Chicago from './components/Chicago'
import Specials from './components/Specials'
import LoginForm from './components/LoginForm'
function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reservations" element={<BookingPage />} />
          <Route
            path="/reservation-confirmation"
            element={<BookingConfirmation />}
          />
          <Route path="/about" element={<Chicago />} />
          <Route path="/menu" element={<Specials />} />
          <Route
            path="/order_online"
            element={
              <section className="message-page">
                <h1>A taste of Little Lemon</h1>
                <p>
                  Online ordering is not available in this portfolio demo.
                  Explore our sample menu or try a table reservation.
                </p>
                <Link className="button" to="/menu">
                  Explore the menu
                </Link>
              </section>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="*"
            element={
              <section className="message-page">
                <h1>Page not found</h1>
                <Link className="button" to="/">
                  Back to home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
export default App

import footerLogo from '../logo_footer.png'
import { Link } from 'react-router-dom'
import { navigation } from './Nav'
function Footer() {
  return (
    <footer className="doormat-nav">
      <img className="footer-logo" src={footerLogo} alt="Little Lemon" />
      <div>
        <h2>Pull up a chair.</h2>
        <p>Mediterranean flavors. Chicago spirit.</p>
        <p className="footer-note">
          A React portfolio project inspired by the Meta Front-End Developer
          Capstone.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <ul>
          {navigation.map(([to, name]) => (
            <li key={to}>
              <Link to={to}>{name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="footer-note">
        Demo experience
        <br />
        No live reservations or payments
      </p>
    </footer>
  )
}
export default Footer

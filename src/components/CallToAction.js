import food from '../assets/restauranfood.jpg'
import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    <section className="callToAction-section">
      <div className="callToAction-heading">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We’re a family-owned Mediterranean restaurant, bringing fresh seasonal
          ingredients and a warm welcome to the heart of Chicago.
        </p>
        <Link to="/reservations" className="button">
          Reserve a Table <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="callToAction-image">
        <img alt="Little Lemon food platter " src={food} />
      </div>
    </section>
  )
}

export default CallToAction

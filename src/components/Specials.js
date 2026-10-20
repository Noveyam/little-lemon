import { Link } from 'react-router-dom'
import greekSalad from '../assets/greek salad.jpg'
import lemonDessert from '../assets/lemon dessert.jpg'
import bruchetta from '../assets/bruchetta.svg'

const specials = [
  {
    name: 'Greek salad',
    image: greekSalad,
    price: 12.99,
    description:
      'This famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons',
  },
  {
    name: 'Bruschetta',
    image: bruchetta,
    price: 5.99,
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
  },
  {
    name: 'Lemon Dessert',
    image: lemonDessert,
    price: 5.0,
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
  },
]

function Specials() {
  return (
    <section className="specials-section">
      <div className="specials-heading">
        <h2>This week’s favorites</h2>
        <Link className="button" to="/menu">
          Explore the menu ↗
        </Link>
      </div>
      <div className="specials">
        {specials.map((special) => {
          return (
            <div className="specials-container" key={special.name}>
              <div className="specials-image">
                <img alt={`${special.name}`} src={special.image} />
              </div>
              <div className="specials-title">
                <h3>{special.name}</h3>
                <p>$ {special.price.toFixed(2)}</p>
              </div>
              <p className="specials-description">{special.description}</p>
              <Link to={'/order_online'} className="specials-link">
                <span>Delivery information</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z"
                  />
                  <path
                    fill="currentColor"
                    d="M5 6h5v2H5zm14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z"
                  />
                </svg>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Specials

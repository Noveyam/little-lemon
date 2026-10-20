import restaurantImg from '../assets/restaurant.jpg'
import chef from '../assets/restaurant chef B.jpg'

function Chicago() {
  return (
    <section className="aboutus-section">
      <div className="aboutus-heading">
        <h2>Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          At Little Lemon, the best moments happen around a table. Our menu
          celebrates Mediterranean cooking with a Chicago twist: vibrant salads,
          rustic bread, and something sweet to finish. Come for the food, stay
          for the company.
        </p>
      </div>
      <div className="aboutus-image">
        <div className="aboutus-image-top">
          <img alt="restaurant decking area" src={restaurantImg} />
        </div>
        <div className="aboutus-image-bottom">
          <img alt="chef cooking in restaurant" src={chef} />
        </div>
      </div>
    </section>
  )
}

export default Chicago

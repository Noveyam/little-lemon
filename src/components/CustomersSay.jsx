import Billy from '../assets/Billy.jpg'
import Gordon from '../assets/Gordon.jpg'
import Sally from '../assets/Sally.jpg'
import Shaun from '../assets/Shaun.jpg'

const testimnonials = [
  {
    rating: 5,
    image: Sally,
    name: 'Sally Joe',
    reviewText:
      'Really loved my visit to Little Lemon they went above and beyond.',
  },
  {
    rating: 4,
    image: Billy,
    name: 'Billy Jean',
    reviewText: 'Fantastic and authentic food, the best in the area.',
  },
  {
    rating: 5,
    image: Shaun,
    name: 'Shaun Rider',
    reviewText: 'My favourite restaurant, we have been coming here for years.',
  },
  {
    rating: 5,
    image: Gordon,
    name: 'Gordon Brown',
    reviewText: 'Really great food would highly recommend the cheese cake.',
  },
]

function CustomersSay() {
  return (
    <section className="testimony-section">
      <div className="testimony-heading">
        <h2>Testimonials</h2>
      </div>
      <p className="sample-note">Sample reviews for this restaurant demo.</p>
      <div className="testimonies">
        {testimnonials.map((testimony) => {
          return (
            <div className="testimony-container" key={testimony.name}>
              <div>
                <h3 className="testimony-heading">
                  Rating: {testimony.rating}/5
                </h3>
              </div>
              <div>
                <figure className="testimony-image">
                  <img alt={testimony.name} src={testimony.image} />
                  <figcaption>{testimony.name}</figcaption>
                </figure>
              </div>
              <div className="testimpony-description">
                <p>"{testimony.reviewText}"</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CustomersSay

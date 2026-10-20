import { Link } from 'react-router-dom'
function LoginForm() {
  return (
    <section className="message-page">
      <h1>No account needed.</h1>
      <p>
        This portfolio demo does not include account registration or sign-in.
        You can try the reservation form without sharing personal details.
      </p>
      <Link className="button" to="/reservations">
        Try a reservation
      </Link>
    </section>
  )
}
export default LoginForm

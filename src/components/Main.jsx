import './Main.css'

function Main(props) {
  return (
    <main>
      <div className="container">{props.children}</div>
    </main>
  )
}

export default Main

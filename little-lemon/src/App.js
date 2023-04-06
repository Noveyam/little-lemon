import './App.css';
import Header from './Header.js';
import Navbar from './Nav';
import Main from './Main.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="app-grid-container">
      <Header />
      <div className="nav-grid-container">
        <Navbar />
      </div>
      <div className="main-grid-container">
        <Main />
      </div>
      {/*
      <div className="footer-grid-container">
        <Footer />
  </div>*/}
    </div>
  );
}

export default App;

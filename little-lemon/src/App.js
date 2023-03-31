import './App.css';
import Header from './Header.js';
import Navbar from './Nav';
import Main from './Main.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="app-grid-container">
      <div className="header-grid-item">
        <Header />
      </div>
      <div className="nav-grid-item">
        <Navbar />
      </div>
      <div className="main-grid-item">
        <Main />
      </div>
    </div>
  );
}

export default App;

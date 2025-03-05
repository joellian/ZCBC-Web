import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import VisitUs from './components/VisitUs'
import ContactUs from './components/ContactUs'
import Giving from './components/Giving'


const App = () => {
  return (
      <Router>
          <div className="App">
              <NavBar />
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/visit-us" element={<VisitUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/giving" element={<Giving />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Songs from './pages/Songs/Songs';
import Verses from './pages/Verses/Verses';
import Images from './pages/Images/Images';
import PrayerRequests from './pages/PrayerRequests/PrayerRequests';
import Contact from './pages/Contact/Contact';
import './styles/globals.css';

function App() {
  useTheme(); // Initialize theme

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/verses" element={<Verses />} />
            <Route path="/images" element={<Images />} />
            <Route path="/prayer-requests" element={<PrayerRequests />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
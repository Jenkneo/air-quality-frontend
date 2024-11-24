import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Map from './pages/Map/Map';
import Forecast from './pages/Forecast/Forecast';
import Notifications from './pages/Notifications/Notifications';
import SafeLevels from './pages/SafeLevels';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/safe-levels" element={<SafeLevels />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

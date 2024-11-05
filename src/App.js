import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Map from './pages/Map';
import PollutionInfo from './pages/PollutionInfo';
import Forecast from './pages/Forecast';
import Notifications from './pages/Notifications/Notifications';
import SmokePrediction from './pages/SmokePrediction';
import SafeLevels from './pages/SafeLevels';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/pollution-info" element={<PollutionInfo />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/smoke-prediction" element={<SmokePrediction />} />
        <Route path="/safe-levels" element={<SafeLevels />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './Home.css';
import useLocation from '../../hooks/useLocation';
import { getAirPollutionData, getAirPollutionForecast } from '../../services/airPollution';
import AirQuality from './AirQuality/AirQuality';
import Forecast from './Forecast/Forecast';
import MiniMap from './MiniMap/MiniMap';

const Home = () => {
  const { location,  } = useLocation();
  const [airData, setAirData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchAirData = async () => {
      if (location.lat && location.lon) {
        try {
          const currentAirData = await getAirPollutionData(location.lat, location.lon);
          setAirData(currentAirData);

          const forecast = await getAirPollutionForecast(location.lat, location.lon);
          setForecastData(forecast);
        } catch (err) {
          console.error('Ошибка при получении данных:', err);
        }
      }
    };

    fetchAirData();
  }, [location]);

  return (
    <div className="home-container">
      <h2 className="home-title">Сегодня</h2>
      <AirQuality airData={airData} />
      <Forecast forecastData={forecastData} />
      <MiniMap />
    </div>
  );
};

export default Home;

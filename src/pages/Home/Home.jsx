// src/components/Home/Home.jsx

import React, { useEffect, useState } from 'react';
import './Home.css';
import useLocation from '../../hooks/useLocation';
import { getAirPollutionData, getAirPollutionForecast } from '../../services/airPollution';
import AirQuality from './AirQuality/AirQuality';
import Forecast from './Forecast/Forecast';

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

  const getNextDayForecast = () => {
    if (!forecastData) return null;
    const currentTime = Date.now();
    const nextDayTimestamp = currentTime + 24 * 60 * 60 * 1000;

    // Фильтруем данные прогноза на следующие 24 часа
    return forecastData.list.filter(
      (item) => item.dt * 1000 >= currentTime && item.dt * 1000 <= nextDayTimestamp
    );
  };

  const groupByDay = (forecast) => {
    const days = {};

    forecast.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString(); // Получаем дату в формате дня

      if (!days[day]) {
        days[day] = [];
      }

      days[day].push(item);
    });

    return days;
  };

  const nextDayForecast = getNextDayForecast();
  const forecastGroupedByDay = nextDayForecast ? groupByDay(nextDayForecast) : null;

  return (
    <div className="home-container">
      <h2 className="title">Сегодня</h2>
      <AirQuality airData={airData} />
      <Forecast forecastGroupedByDay={forecastGroupedByDay} />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import useLocation from '../../hooks/useLocation';
import { getAirPollutionForecast } from '../../services/airPollution';
import './Forecast.css';
import { AirQualityCard } from './AirQualityCard/AirQualityCard';

const Forecast = () => {
  const { location, error } = useLocation();
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (location.lat && location.lon) {
        const data = await getAirPollutionForecast(location.lat, location.lon);
        const dailyForecasts = data.list.filter((_, index) => index % 24 === 0).slice(0, 5);
        setForecastData(dailyForecasts);
      }
    };

    fetchForecastData();
  }, [location]);

  return (
    <div className='forecast-container'>
      <div className="forecast-title">Прогноз загрязнения воздуха на 5 дней</div>
      {error ? (
        <p>Ошибка определения местоположения: {error}</p>
      ) : (
        forecastData ? (
          <div className='forecast-inner-container'>
            {forecastData.map((day, index) => {
              const sideClass = index % 2 === 0 ? "" : "right-side"; 
              return <AirQualityCard key={day.dt} data={day} side={sideClass} />;
            })}
          </div>
        ) : (
          <p>Загрузка прогноза загрязнения воздуха...</p>
        )
      )}
    </div>
  );
};

export default Forecast;

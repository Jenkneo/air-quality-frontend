import React, { useEffect, useState } from 'react';
import useLocation from '../../hooks/useLocation';
import { getAirPollutionForecast } from '../../services/airPollution';
import './Forecast.css';
import { AirQualityCard } from './AirQualityCard';

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

  console.log(forecastData)
      
  return (
    <div className='forecast-container'>
      <div className="forecast-title">Прогноз загрязнения воздуха на 5 дней</div>
      {error ? (
        <p>Ошибка определения местоположения: {error}</p>
      ) : (
        forecastData ? (
          <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forecastData.map((day) => (
                <AirQualityCard key={day.dt} data={day} />
              ))}
            </div>
          </div>
        </div>
        ) : (
          <p>Загрузка прогноза загрязнения воздуха...</p>
        )
      )}
    </div>

  );
};

export default Forecast;

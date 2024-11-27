import React, { useEffect, useState } from 'react';
import useLocation from '../../hooks/useLocation';
import { getAirPollutionForecast } from '../../services/airPollution';
import './Forecast.css';
import { AirQualityCard } from './AirQualityCard/AirQualityCard';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Forecast = () => {
  const { location } = useLocation();
  const [rawForecastData, setRawForecastData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const [selectedDay, setSelectedDay] = useState(null); // выбранный день
  const [isPopupVisible, setPopupVisible] = useState(false); // состояние попапа

  const openPopup = (day) => {
    const date = new Date(day.date);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0];
    
    const data = rawForecastData.list.filter(item => {
      const itemDate = new Date(item.dt * 1000);
      const localItemDate = new Date(itemDate.getTime() - timezoneOffset).toISOString().split('T')[0];
      return localItemDate === localDate;
    });

    setSelectedDay(data);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedDay(null);
    setPopupVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!location.lat || !location.lon) return;
      const data = await getAirPollutionForecast(location.lat, location.lon);
      setRawForecastData(data);
    };
    
    fetchData();
  }, [location]);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (!rawForecastData) return;
      let data = rawForecastData;

      const timezoneOffset = new Date().getTimezoneOffset() * 60000;
      const groupedByDay = data.list.reduce((acc, entry) => {
        const date = new Date(entry.dt * 1000 - timezoneOffset).toISOString().split('T')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
      }, {});

      const dailyMaxValues = Object.entries(groupedByDay).map(([date, entries]) => {
        const maxComponents = entries.reduce(
          (maxValues, currentEntry) => {
            Object.keys(currentEntry.components).forEach((key) => {
              maxValues.components[key] = Math.max(
                maxValues.components[key] || 0,
                currentEntry.components[key]
              );
            });
            maxValues.main.aqi = Math.max(maxValues.main.aqi, currentEntry.main.aqi);
            return maxValues;
          },
          {
            main: { aqi: 0 },
            components: {}
          }
        );

        return { date, ...maxComponents };
      });

      setForecastData(dailyMaxValues.slice(0, 5));
    }

    fetchForecastData();
  }, [rawForecastData]);


  return (
    <div className='forecast-container'>
      <div className="forecast-title">Прогноз загрязнения воздуха</div>

      {forecastData ? (
        <div className='forecast-inner-container'>
          {forecastData.map((day, index) => {
            const sideClass = index % 2 === 0 ? "" : "right-side"; 
            return <AirQualityCard key={`${day.dt}-${index}`} data={day} side={sideClass} onClick={() => openPopup(day)}/>;
          })}
        </div>
        ) : (
          <p>Загрузка прогноза загрязнения воздуха...</p>
        )
      }

      {/* Попап для подробного прогноза */}
      {isPopupVisible && (
        <div className='popup-overlay' onClick={closePopup}>
          <div className='popup-content' onClick={(e) => e.stopPropagation()}>
            <button onClick={closePopup} className='popup-close'>X</button>
            <h3>Подробный прогноз на 
              {` ` + format(new Date(selectedDay[0].dt * 1000), 'd MMMM', { locale: ru })}
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>AQI</th>
                    <th>CO (µg/m³)</th>
                    <th>NO (µg/m³)</th>
                    <th>NO₂ (µg/m³)</th>
                    <th>O₃ (µg/m³)</th>
                    <th>SO₂ (µg/m³)</th>
                    <th>PM2.5 (µg/m³)</th>
                    <th>PM10 (µg/m³)</th>
                    <th>NH₃ (µg/m³)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDay.map((entry, index) => (
                    <tr key={index}>
                      <td>{new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td>{entry.main.aqi}</td>
                      <td>{entry.components.co}</td>
                      <td>{entry.components.no}</td>
                      <td>{entry.components.no2}</td>
                      <td>{entry.components.o3}</td>
                      <td>{entry.components.so2}</td>
                      <td>{entry.components.pm2_5}</td>
                      <td>{entry.components.pm10}</td>
                      <td>{entry.components.nh3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Forecast;

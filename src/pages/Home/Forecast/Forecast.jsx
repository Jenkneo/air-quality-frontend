import React from 'react';
import PropTypes from 'prop-types';
import './Forecast.css';

const Forecast = ({ forecastData }) => {
  if (!forecastData) {
    return (
      <div className="forecast-container">
        <h3>Данные прогноза недоступны или все еще подгружаются....</h3>
      </div>
    )
  }

  const dayForecast = forecastData.list.slice(0, 24);

  function groupByDayAndTimeOfDay(data) {
    const groupedData = { today: { Morning: [], Day: [], Evening: [], Night: [] }, tomorrow: { Morning: [], Day: [], Evening: [], Night: [] } };

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;

    const today = new Date(currentDate.getTime() - timezoneOffset).toISOString().split('T')[0];
    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1) - timezoneOffset).toISOString().split('T')[0];

    data.forEach(entry => {
        const timestamp = entry.dt * 1000;
        const date = new Date(timestamp - timezoneOffset);
        
        const day = date.toISOString().split('T')[0];
        const hours = date.getHours();

        const timeOfDay = 
            hours >= 4 && hours < 10 ? "Morning" : 
            hours >= 10 && hours < 16 ? "Day" : 
            hours >= 16 && hours < 22 ? "Evening" : 
            "Night";

        if (day === today) {
            groupedData.today[timeOfDay].push(entry);
        } else if (day === tomorrow) {
            groupedData.tomorrow[timeOfDay].push(entry);
        }
    });

    return groupedData;
  }

  function summarizeData(data) {
    const groupedData = { today: { Morning: [], Day: [], Evening: [], Night: [] }, tomorrow: { Morning: [], Day: [], Evening: [], Night: [] } };
    for (const day in data) {
      for (const timeOfDay in data[day]) {
        const entries = data[day][timeOfDay];
        const numEntries = entries.length;
        if (numEntries === 0) {
          delete groupedData[day][timeOfDay];
          continue;
        }

        const minAQI = Math.min(...entries.map(entry => entry.main.aqi));
        const maxAQI = Math.max(...entries.map(entry => entry.main.aqi));

        const range = minAQI === maxAQI ? String(minAQI) : `${minAQI}-${maxAQI}`;
        groupedData[day][timeOfDay] = range;
      }

      if (Object.keys(groupedData[day]).length === 0) {
        delete groupedData[day];
      }
    }

    return groupedData;
  }


  const data = summarizeData(groupByDayAndTimeOfDay(dayForecast))


  return (
    <div className="day-forecast__widget">
      <div className="day-forecast__widget-row">
        <span className="day-forecast__time">Утро</span>
        <div className="day-forecast__current-aqi">
          <span className="day-forecast__icon">☁️</span>
          <span className="day-forecast__aqi">1-2 AQI</span>
        </div>
        <span className="day-forecast__status normal">Показатели в норме</span>
      </div>
      <div className="day-forecast__widget-row">
        <span className="day-forecast__time">День</span>
        <div className="day-forecast__current-aqi">
          <span className="day-forecast__icon">☁️</span>
          <span className="day-forecast__aqi">2-3 AQI</span>
        </div>
        <span className="day-forecast__status moderate">Есть загрязнение</span>
      </div>
      <div className="day-forecast__widget-row">
        <span className="day-forecast__time">Вечер</span>
        <div className="day-forecast__current-aqi">
          <span className="day-forecast__icon">☁️</span>
          <span className="day-forecast__aqi">3-5 AQI</span>
        </div>
        <span className="day-forecast__status high">Превышение нормы</span>
      </div>
      <div className="day-forecast__widget-row">
        <span className="day-forecast__time">Ночь</span>
        <div className="day-forecast__current-aqi">
          <span className="day-forecast__icon">☁️</span>
          <span className="day-forecast__aqi">2-4 AQI</span>
        </div>
        <span className="day-forecast__status normal">Показатели в норме</span>
      </div>
      <div className="day-forecast__divider">
          <div className="day-forecast__bottom-divider" />
          <div className="day-forecast__after-divider" />
        </div>
      <div className="day-forecast__widget-row">
        <span className="day-forecast__time">Утро</span>
        <div className="day-forecast__current-aqi">
          <span className="day-forecast__icon">☁️</span>
          <span className="day-forecast__aqi">2-4 AQI</span>
        </div>
        <span className="day-forecast__status normal">Показатели в норме</span>
      </div>
    </div>
  );
};

Forecast.propTypes = {
  forecastGroupedByDay: PropTypes.object,
};

export default Forecast;

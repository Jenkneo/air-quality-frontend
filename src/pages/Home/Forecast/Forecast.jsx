import React from 'react';
import PropTypes from 'prop-types';
import './Forecast.css';
import { NavLink } from 'react-router-dom';


const Forecast = ({ forecastData }) => {
  if (!forecastData) {
    return (
      <div className="day-forecast__widget">
        <div className="loading-container-icon">
          <i className="fa fa-spinner fa-spin" />
        </div>
      </div>
    )
  }

  const dayForecast = forecastData.list.slice(0, 24);

  function groupByDayAndTimeOfDay(data) {
    const groupedData = { today: { Morning: [], Day: [], Evening: [], Night: [] }, tomorrow: { Morning: [], Day: [], Evening: [], Night: [] } };

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset();

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

  const data = summarizeData(groupByDayAndTimeOfDay(dayForecast));

  return (
    <NavLink className="day-forecast__widget" to="/forecast">
      {Object.keys(data).map((day, index) => (
        <React.Fragment key={day}>
          {/* Разделитель между "сегодня" и "завтра" */}
          {index > 0 && (
            <div className="day-forecast__divider">
              <div className="day-forecast__bottom-divider" />
              <div className="day-forecast__after-divider" />
            </div>
          )}
  
          <div className="forecast-day">
            <h4 className='day-forecast__title'>{day === 'today' ? 'Сегодня' : 'Завтра'}</h4>
            {Object.keys(data[day]).map(timeOfDay => (
              <div key={timeOfDay} className="day-forecast__widget-row">
                <span className="day-forecast__time">
                  {timeOfDay === 'Morning' ? 'Утро' : timeOfDay === 'Day' ? 'День' : timeOfDay === 'Evening' ? 'Вечер' : 'Ночь'}
                </span>
                <div className="day-forecast__current-aqi">
                  <span className="day-forecast__icon">☁️</span>
                  <span className="day-forecast__aqi">{data[day][timeOfDay]} AQI</span>
                </div>
                <span className={`day-forecast__status ${getAQIStatusClass(data[day][timeOfDay])}`}>
                  {getAQIStatusText(data[day][timeOfDay])}
                </span>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </NavLink>
  );
};

// Функция для определения класса статуса по уровню AQI
function getAQIStatusClass(aqiRange) {
  const maxAQI = parseInt(aqiRange.split('-').pop(), 10);
  if (maxAQI <= 2) return 'normal';
  if (maxAQI <= 3) return 'moderate';
  return 'high';
}

// Функция для определения текста статуса по уровню AQI
function getAQIStatusText(aqiRange) {
  const maxAQI = parseInt(aqiRange.split('-').pop(), 10);
  if (maxAQI <= 2) return 'Показатели в норме';
  if (maxAQI <= 3) return 'Есть загрязнение';
  return 'Превышение нормы';
}

Forecast.propTypes = {
  forecastData: PropTypes.object,
};

export default Forecast;

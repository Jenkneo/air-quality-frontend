import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Wind, Droplets, AlertTriangle } from 'lucide-react';
import './AirQualityCard.css';

const getAQIClass = (aqi) => {
  const classes = {
    1: 'excellent',
    2: 'good',
    3: 'moderate',
    4: 'poor',
    5: 'veryPoor',
  };
  return `${'forecast-card__badge'} ${classes[aqi] || classes[5]}`;
};

const getAQIText = (aqi) => {
  const texts = {
    1: 'Отличное',
    2: 'Хорошее',
    3: 'Умеренное',
    4: 'Плохое',
    5: 'Очень плохое',
  };
  return texts[aqi] || texts[5];
};

export const AirQualityCard = ({ data }) => {
  return (
    <div className='forecast-card'>
      <div className='forecast-card__header'>
        <div>
          <h3 className='forecast-card__date'>
            {format(new Date(data.dt * 1000), 'd MMMM', { locale: ru })}
          </h3>
          <p className='forecast-card__weekday'>
            {format(new Date(data.dt * 1000), 'EEEE', { locale: ru })}
          </p>
        </div>
        <span className={getAQIClass(data.main.aqi)}>
          {getAQIText(data.main.aqi)}
        </span>
      </div>

      <div className='forecast-card__grid'>
        <div className='forecast-card__column'>
          <div className='forecast-card__metric'>
            <Wind className='forecast-card__icon' />
            <div>
              <p className='forecast-card__metricLabel'>CO</p>
              <p className='forecast-card__metricValue'>{data.components.co.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className='forecast-card__metric'>
            <Droplets className='forecast-card__icon' />
            <div>
              <p className='forecast-card__metricLabel'>PM2.5</p>
              <p className='forecast-card__metricValue'>{data.components.pm2_5.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className='forecast-card__metric'>
            <AlertTriangle className='forecast-card__icon' />
            <div>
              <p className='forecast-card__metricLabel'>SO₂</p>
              <p className='forecast-card__metricValue'>{data.components.so2.toFixed(1)} мкг/м³</p>
            </div>
          </div>
        </div>
        
        <div className='forecast-card__column'>
          <div className='forecast-card__metric'>
            <Wind className='forecast-card__icon' />
            <div>
              <p className='forecast-card__metricLabel'>NO₂</p>
              <p className='forecast-card__metricValue'>{data.components.no2.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className='forecast-card__metric'>
            <Droplets className='forecast-card__icon' />
            <div>
              <p className='forecast-card__metricLabel'>O₃</p>
              <p className='forecast-card__metricValue'>{data.components.o3.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className='forecast-card__metric'>
            <AlertTriangle className='forecast-card__icon' />
            <div>
              <p className='forecast-card__metricLabel'>PM10</p>
              <p className='forecast-card__metricValue'>{data.components.pm10.toFixed(1)} мкг/м³</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
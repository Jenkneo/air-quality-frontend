import React from 'react';
import { Wind, Droplets, AlertTriangle } from 'lucide-react';
import './PopupCard.css';

const getAQIClass = (aqi) => {
  const classes = {
    1: 'excellent',
    2: 'good',
    3: 'moderate',
    4: 'poor',
    5: 'veryPoor',
  };
  return `${'map-card__badge'} ${classes[aqi] || classes[5]}`;
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

export const PopupCard = ({ data }) => {
  return (
    <div className={`map-card`} >
      <div className='map-card__header'>
        <div>
          <h3 className='map-card__date'>
            {data.city}
          </h3>
        </div>
        <span className={getAQIClass(data.aqi)}>
          AQI: {data.aqi} {getAQIText(data.aqi)}
        </span>
      </div>

      <div className='map-card__grid'>
        <div className='map-card__column'>
          <div className='map-card__metric'>
            <Wind className='map-card__icon' />
            <div>
              <div className='map-card__metricLabel'>CO</div>
              <div className='map-card__metricValue'>{data.components.co.toFixed(1)} мкг/м³</div>
            </div>
          </div>
          <div className='map-card__metric'>
            <Droplets className='map-card__icon' />
            <div>
              <div className='map-card__metricLabel'>PM2.5</div>
              <div className='map-card__metricValue'>{data.components.pm2_5.toFixed(1)} мкг/м³</div>
            </div>
          </div>
          <div className='map-card__metric'>
            <AlertTriangle className='map-card__icon' />
            <div>
              <div className='map-card__metricLabel'>SO₂</div>
              <div className='map-card__metricValue'>{data.components.so2.toFixed(1)} мкг/м³</div>
            </div>
          </div>
        </div>

        <div className='map-card__column'>
          <div className='map-card__metric'>
            <Wind className='map-card__icon' />
            <div>
              <div className='map-card__metricLabel'>NO₂</div>
              <div className='map-card__metricValue'>{data.components.no2.toFixed(1)} мкг/м³</div>
            </div>
          </div>
          <div className='map-card__metric'>
            <Droplets className='map-card__icon' />
            <div>
              <div className='map-card__metricLabel'>O₃</div>
              <div className='map-card__metricValue'>{data.components.o3.toFixed(1)} мкг/м³</div>
            </div>
          </div>
          <div className='map-card__metric'>
            <AlertTriangle className='map-card__icon' />
            <div>
              <div className='map-card__metricLabel'>PM10</div>
              <div className='map-card__metricValue'>{data.components.pm10.toFixed(1)} мкг/м³</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
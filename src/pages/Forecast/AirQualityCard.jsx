import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Wind, Droplets, AlertTriangle } from 'lucide-react';
import styles from './AirQualityCard.module.css';

const getAQIClass = (aqi) => {
  const classes = {
    1: styles.excellent,
    2: styles.good,
    3: styles.moderate,
    4: styles.poor,
    5: styles.veryPoor,
  };
  return `${styles.badge} ${classes[aqi] || classes[5]}`;
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
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.date}>
            {format(new Date(data.dt * 1000), 'd MMMM', { locale: ru })}
          </h3>
          <p className={styles.weekday}>
            {format(new Date(data.dt * 1000), 'EEEE', { locale: ru })}
          </p>
        </div>
        <span className={getAQIClass(data.main.aqi)}>
          {getAQIText(data.main.aqi)}
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <div className={styles.metric}>
            <Wind className={styles.icon} />
            <div>
              <p className={styles.metricLabel}>CO</p>
              <p className={styles.metricValue}>{data.components.co.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className={styles.metric}>
            <Droplets className={styles.icon} />
            <div>
              <p className={styles.metricLabel}>PM2.5</p>
              <p className={styles.metricValue}>{data.components.pm2_5.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className={styles.metric}>
            <AlertTriangle className={styles.icon} />
            <div>
              <p className={styles.metricLabel}>SO₂</p>
              <p className={styles.metricValue}>{data.components.so2.toFixed(1)} мкг/м³</p>
            </div>
          </div>
        </div>
        
        <div className={styles.column}>
          <div className={styles.metric}>
            <Wind className={styles.icon} />
            <div>
              <p className={styles.metricLabel}>NO₂</p>
              <p className={styles.metricValue}>{data.components.no2.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className={styles.metric}>
            <Droplets className={styles.icon} />
            <div>
              <p className={styles.metricLabel}>O₃</p>
              <p className={styles.metricValue}>{data.components.o3.toFixed(1)} мкг/м³</p>
            </div>
          </div>
          <div className={styles.metric}>
            <AlertTriangle className={styles.icon} />
            <div>
              <p className={styles.metricLabel}>PM10</p>
              <p className={styles.metricValue}>{data.components.pm10.toFixed(1)} мкг/м³</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
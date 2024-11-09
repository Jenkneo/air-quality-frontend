import React from 'react';
import './Telegram.css';
import { getCache } from '../../../utils/cache';
import { TELEGRAM_BOT_USERNAME, TELEGRAM_URL } from '../../../config';

const GEOLOCATION_KEY = 'geolocation';
const TELEGRAM_BOT_URL = `${TELEGRAM_URL}/${TELEGRAM_BOT_USERNAME}`;

const Telegram = () => {
  const redirectToTelegram = () => {
    const location = getCache(GEOLOCATION_KEY)
    const lon = String(location.lon).replace('.', '-');
    const lat = String(location.lat).replace('.', '-');
    const url = `${TELEGRAM_BOT_URL}?start=lon${lon}lat${lat}`

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="telegram-container">
      <p>Чтобы подписаться на уведомления, нажмите на кнопку ниже.</p>
      <button className="submit-button" onClick={redirectToTelegram}>
        <i className="fa-brands fa-telegram"></i>
        Подписаться
      </button>
    </div>
  );
};

export default Telegram;

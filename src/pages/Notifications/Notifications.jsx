import React from 'react';
import './Notifications.css';
import Telegram from './Telegram/Telegram';

const Notifications = () => {
  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Уведомления</h2>
      <Telegram />
    </div>
  );
};

export default Notifications;

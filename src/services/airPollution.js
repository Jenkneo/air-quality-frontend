import axios from 'axios';
import { BACKEND_URL } from '../config';

// Функция для получения данных о загрязнении воздуха
export const getAirPollutionData = async (lat, lon) => {
  try {
    //отправляем гет на сервер
    const response = await axios.get(`${BACKEND_URL}/api/get-pollution?lat=${lat}&lon=${lon}`);
    //получаем данные
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных о загрязнении воздуха:', error);
    throw error;
  }
};

// Функция для получения прогноза загрязнения воздуха
export const getAirPollutionForecast = async (lat, lon) => {
  try {
    //отправляем гет на сервер
    const response = await axios.get(`${BACKEND_URL}/api/get-forecast?lat=${lat}&lon=${lon}`);
    //получаем данные
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении прогноза загрязнения воздуха:', error);
    throw error;
  }
};

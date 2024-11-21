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

// Функция для данных о загрязнении воздуха на карте
export const getAirPollutionMap = async () => {
  try {
    //отправляем гет на сервер
    const response = await axios.get(`${BACKEND_URL}/api/map`);
    //получаем данные
    return response.data;
  } catch (error) {
    console.error('Ошибка при данных о загрязнении воздуха на карте:', error);
    throw error;
  }
};

// Функция для данных о загрязнении воздуха на карте
export const getFakeAirPollutionMap = async () => {
  const data = [
    {
        "lat": 55.751244,
        "lon": 37.618423,
        "aqi": 2,
        "components": {
            "co": 293.73,
            "no": 0.21,
            "no2": 44.55,
            "o3": 31.11,
            "so2": 16.93,
            "pm2_5": 4.37,
            "pm10": 5.24,
            "nh3": 0.4
        },
        "city": "Москва",
        "radius": 16000
    },
    {
        "lat": 46.34875,
        "lon": 48.03669,
        "aqi": 5,
        "components": {
            "co": 3417.97,
            "no": 8.61,
            "no2": 111.04,
            "o3": 0.69,
            "so2": 35.76,
            "pm2_5": 226.73,
            "pm10": 365.75,
            "nh3": 46.1
        },
        "city": "Астрахань",
        "radius": 4000
    }
]
  return data;
};

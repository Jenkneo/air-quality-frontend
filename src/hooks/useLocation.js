import { useState, useEffect } from 'react';
import { setCache, getCache } from '../utils/cache';

function useLocation(initialPosition = null) {
  const [location, setLocation] = useState(initialPosition || { lat: null, lon: null }); // состояние для хранения данных местоположения
  const [error, setError] = useState(null); // состояние для ошибок (например, если и IP не получится получить)

  useEffect(() => {
    const cachedPosition = getCache('location');

    if (cachedPosition) {
      setLocation(cachedPosition);
    }

    const handleLocationError = () => {
      // Если доступ к геопозиции отклонен, запрашиваем местоположение по IP
      fetch("http://stylua.ru:8000/api/get-city")
        .then((response) => response.json())
        .then((data) => {
          const location = {
            city: data.city,
            lat: data.coordinates.lat,
            lon: data.coordinates.lon,
          }
          setLocation(location);
          setCache('location', location);
        })
        .catch((err) => setError("Ошибка при получении местоположения по IP: " + err.message));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        handleLocationError // Вызываем handleLocationError, если пользователь отклонит запрос на доступ
      );
    } else {
      handleLocationError();
    }
  }, []);

  return { location, error }; // Возвращаем объект с данными местоположения и возможной ошибкой
}

export default useLocation;
import { useState, useEffect } from 'react';
import { setCache, getCache } from '../utils/cache';

function useLocation(initialPosition = null) {
  const [location, setLocation] = useState(initialPosition || { city: null, lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedLocation = getCache('location');

    if (cachedLocation) {
      setLocation(cachedLocation);
      return;
    }

    const fetchCityByCoords = (lat, lon) => {
      fetch(`http://stylua.ru:8000/api/get-city?lon=${lon}&lat=${lat}`)
        .then((response) => response.json())
        .then((data) => {
          const locationData = {
            city: data.city,
            lat: data.coordinates.lat,
            lon: data.coordinates.lon,
          };
          setLocation(locationData);
          setCache('location', locationData);
        })
        .catch((err) => setError("Ошибка при получении города по координатам: " + err.message));
    };

    const handleLocationError = () => {
      fetch("http://stylua.ru:8000/api/get-city")
        .then((response) => response.json())
        .then((data) => {
          const locationData = {
            city: data.city,
            lat: data.coordinates.lat,
            lon: data.coordinates.lon,
          };
          setLocation(locationData);
          setCache('location', locationData);
        })
        .catch((err) => setError("Ошибка при получении местоположения по IP: " + err.message));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityByCoords(latitude, longitude);
        },
        handleLocationError
      );
    } else {
      handleLocationError();
    }
  }, []);

  return { location, error };
}

export default useLocation;

import React, { useState, useEffect } from 'react';
import './CitySelector.css';
import citiesData from './cities.json';
import useLocation from '../../../hooks/useLocation';
// import { setCityName } from '../../../services/geocoding';
import { setCache } from '../../../utils/cache';


const CitySelector = ({ isCitySelectorActive, closeCitySelector }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCities, setSortedCities] = useState([]);
  const [initialPosition, setInitialPosition] = useState(null);
  const { } = useLocation(initialPosition); // eslint-disable-line

  useEffect(() => {
    const sorted = [...citiesData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedCities(sorted);
  }, []);

  useEffect(() => {
    if (isCitySelectorActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCitySelectorActive]);

  const handleCityClick = (city) => {
    const location = {
      "city": city.name,
      "lon": city.lon,
      "lat": city.lat
    }

    setCache('location', location)
    setInitialPosition(location);
    closeCitySelector();
    window.location.reload();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCities = sortedCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`mobile-nav ${isCitySelectorActive ? 'active' : ''}`}>
      <button className="close-menu" aria-label="Закрыть меню" onClick={closeCitySelector}>
        <i className="fas fa-times"></i>
      </button>
      <div className="city-list-container">
        <h1>Список городов:</h1>
        <input
          type="text"
          placeholder="Поиск города"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredCities.map((city, index) => (
            <li key={index} onClick={() => handleCityClick(city)}>
              {city.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CitySelector;

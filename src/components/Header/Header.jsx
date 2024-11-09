import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import useLocation from '../../hooks/useLocation';
import MobileMenu from './MobileMenu/MobileMenu';
import CitySelector from './CitySelector/CitySelector';


const Header = () => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const [isCitySelectorActive, setIsCitySelectorActive] = useState(false);

  const { location } = useLocation();

  // Обработчик открытия/закрытия мобильного меню
  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  // Обработчик закрытия мобильного меню
  const closeMobileNav = () => {
    setIsMobileNavActive(false);
  };

  const toggleCitySelector = () => {
    setIsCitySelectorActive(!isCitySelectorActive);
  };

  const closeCitySelector = () => {
    setIsCitySelectorActive(false);
  };

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsMobileNavActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Очистка обработчика при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Обработчик кнопки геолокации
  const handleGeolocation = () => {
    toggleCitySelector();
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} to="/">
              <i className="fa-solid fa-cloud"></i>
            </NavLink>
          </div>
          <div className="location">
            <button
              id="geolocation-btn"
              aria-label="Определить местоположение"
              onClick={handleGeolocation}
            >
              <i className="fas fa-map-marker-alt"></i>
            </button>
            <span className="city-name">{location.city}</span>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li>
                <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} to="/forecast">Прогноз</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} to="/map">Карта</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} to="/notifications">Уведомления</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} to="/safe-levels">Нормы</NavLink>
              </li>
            </ul>
          </nav>
          <div
            className="menu-toggle"
            id="mobile-menu"
            aria-label="Открыть меню"
            onClick={toggleMobileNav}
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </header>

      <MobileMenu isMobileNavActive={isMobileNavActive} closeMobileNav={closeMobileNav} />
    
      <CitySelector isCitySelectorActive={isCitySelectorActive} closeCitySelector={closeCitySelector} />
    
    </>
  );
};

export default Header;

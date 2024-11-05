import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './MobileMenu.css';

const MobileNav = ({ isMobileNavActive, closeMobileNav }) => {

  useEffect(() => {
    if (isMobileNavActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileNavActive]);
  
  return (
    <nav className={`mobile-nav ${isMobileNavActive ? 'active' : ''}`}>
      <button className="close-menu" aria-label="Закрыть меню" onClick={closeMobileNav}>
        <i className="fas fa-times"></i>
      </button>
      <ul className="nav-list">
        <li>
          <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} onClick={closeMobileNav} to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} onClick={closeMobileNav} to="/forecast">Прогноз</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} onClick={closeMobileNav} to="/map">Карта</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} onClick={closeMobileNav} to="/notifications">Уведомления</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`} onClick={closeMobileNav} to="/safe-levels">Нормы</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;

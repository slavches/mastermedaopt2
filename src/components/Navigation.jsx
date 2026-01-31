import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'; // Современные иконки
import './Navigation.css';
import logoImg from '../assets/images/logo-header.png';

function Navigation({ currentSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const leftSections = [
    { id: 'home', label: 'Главная' },
    { id: 'products', label: 'Продукция' },
    { id: 'clients', label: 'Клиенты' },
  ];

  const rightSections = [
    { id: 'partners', label: 'Партнеры' },
    { id: 'news', label: 'Новости' },
    { id: 'about', label: 'О нас' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderLink = (section) => (
    <motion.button
      key={section.id}
      className={`nav-link ${currentSection === section.id ? 'active' : ''}`}
      onClick={() => {
        onSectionChange(section.id);
        setIsOpen(false);
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {section.label}
    </motion.button>
  );

  return (
    <motion.nav 
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="nav-container">
        {/* Ссылки слева */}
        <div className="nav-side left">
          {leftSections.map(renderLink)}
        </div>

        {/* Логотип строго по центру */}
        <motion.div 
          className="logo"
          style={{ x: "-50%" }}
          whileHover={{ scale: 1.05, x: "-50%" }}
          onClick={() => {
            onSectionChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={logoImg} alt="Мастер Мёда" className="logo-image" />
        </motion.div>

        {/* Ссылки справа */}
        <div className="nav-side right">
          {rightSections.map(renderLink)}
        </div>

        {/* Мобильное меню (выезжает только на мобилках) */}
        <div className={`nav-links-mobile ${isOpen ? 'open' : ''}`}>
          {[...leftSections, ...rightSections].map(renderLink)}
        </div>

        {/* Кнопка бургера */}
        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiOutlineMenuAlt4 />}
        </button>
      </div>
    </motion.nav>
  );
}

export default Navigation;
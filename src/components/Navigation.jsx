import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navigation.css';
import logoImg from '../assets/images/logo-header.png';

function Navigation({ currentSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'home', label: 'Главная' },
    { id: 'products', label: 'Продукция' },
    { id: 'clients', label: 'Клиенты' },
    { id: 'partners', label: 'Партнеры' },
    { id: 'news', label: 'Новости' },
    { id: 'about', label: 'О нас' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Оптимизируем вызов через пассивный слушатель
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      /* Делаем выезд шапки более упругим и быстрым */
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
<div className="nav-container">
        <motion.div 
          className="logo"
          /* 1. Указываем центрирование для Framer Motion */
          style={{ x: "-50%" }} 
          /* 2. Добавляем x: "-50%" в анимации, чтобы лого не улетало влево */
          whileHover={{ scale: 1.05, x: "-50%" }}
          whileTap={{ scale: 0.95, x: "-50%" }}
          onClick={() => {
            onSectionChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={logoImg} alt="Мастер Мёда" className="logo-image" />
        </motion.div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {/* Твои кнопки (тут всё отлично) */}
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`nav-link ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => {
                onSectionChange(section.id);
                setIsOpen(false);
              }}
              whileHover={{ y: -2, color: "#d4a017" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {section.label}
            </motion.button>
          ))}
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </motion.nav>
  );
}

export default Navigation;
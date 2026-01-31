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
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            onSectionChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* Заменяем текст на изображение */}
          <img src={logoImg} alt="Мастер Мёда" className="logo-image" />
        </motion.div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`nav-link ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => {
                onSectionChange(section.id);
                setIsOpen(false);
              }}
              /* Ускоренная реакция на наведение */
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
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Используем более современные иконки (HiOutlineMenuAlt4 и HiX)
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'; 
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

  // Функция для рендера ссылок (чтобы не дублировать код)
  const renderLinks = (items) => items.map((section) => (
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
  ));

  return (
    <motion.nav 
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="nav-container">
        {/* ЛЕВЫЙ БЛОК (только десктоп) */}
        <div className="nav-links-desktop side-left">
          {renderLinks(leftSections)}
        </div>

        {/* ЦЕНТРАЛЬНЫЙ ЛОГОТИП */}
        <motion.div 
          className="logo"
          style={{ x: "-50%" }}
          whileHover={{ scale: 1.05, x: "-50%" }}
          onClick={() => {
            onSectionChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={logoImg} alt="Logo" className="logo-image" />
        </motion.div>

        {/* ПРАВЫЙ БЛОК (только десктоп) */}
        <div className="nav-links-desktop side-right">
          {renderLinks(rightSections)}
        </div>

        {/* МОБИЛЬНОЕ МЕНЮ (выезжает отдельно) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="nav-links-mobile"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderLinks([...leftSections, ...rightSections])}
            </motion.div>
          )}
        </AnimatePresence>

        {/* БУРГЕР */}
        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiOutlineMenuAlt4 />}
        </button>
      </div>
    </motion.nav>
  );
}

export default Navigation;
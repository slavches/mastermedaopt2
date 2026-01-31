import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5'; // Тот самый современный стиль
import './Navigation.css';
import logoImg from '../assets/images/logo-header.png';

function Navigation({ currentSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const leftLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'products', label: 'Продукция' },
    { id: 'clients', label: 'Клиенты' },
  ];

  const rightLinks = [
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
      whileHover={{ y: -2, color: "#d4a017" }}
      whileTap={{ scale: 0.95 }}
    >
      {section.label}
    </motion.button>
  );

  return (
    <motion.nav 
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="nav-container">
        <div className="nav-side desktop-only">
          {leftLinks.map(renderLink)}
        </div>

        <motion.div 
          className="logo"
          style={{ x: "-50%" }}
          whileHover={{ scale: 1.05, x: "-50%" }}
          onClick={() => {
            onSectionChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={logoImg} alt="Лого" className="logo-image" />
        </motion.div>

        <div className="nav-side desktop-only text-right">
          {rightLinks.map(renderLink)}
        </div>

        {/* Важно: класс nav-links должен совпадать с CSS */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {[...leftLinks, ...rightLinks].map(renderLink)}
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
    </motion.nav>
  );
}

export default Navigation;
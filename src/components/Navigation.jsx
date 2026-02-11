import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5';
import './Navigation.css';
import logoImg from '../assets/images/logo-header.png';
import OrderForm from './OrderForm';  // Исправь путь

function Navigation({ currentSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);  // Мобильное меню
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);  // Модалка формы

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
      whileHover={{ y: -2, color: "#FFF8DC" }}
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

        <div className="logo-wrapper">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onSectionChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={logoImg} alt="Лого" className="logo-image" />
          </motion.div>
        </div>

        <div className="nav-side desktop-only text-right">
          {rightLinks.map(renderLink)}
          <motion.button
            className="nav-cta-btn"
            onClick={() => setIsFormOpen(true)}
            whileHover={{ y: -2, color: "#FFF8DC" }}
            whileTap={{ scale: 0.95 }}
          >
            Получить прайс
          </motion.button>
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {[...leftLinks, ...rightLinks].map(renderLink)}
          <motion.button 
            className="nav-cta-btn mobile"
            onClick={() => { setIsFormOpen(true); setIsOpen(false); }}
            whileHover={{ y: -2, color: "#FFF8DC" }}
            whileTap={{ scale: 0.95 }}
          >
            Получить прайс
          </motion.button>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="form-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              className="form-modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setIsFormOpen(false)}>
                ×
              </button>
              <h3>Запросить оптовый прайс-лист</h3>
              <OrderForm onSuccess={() => setIsFormOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navigation;
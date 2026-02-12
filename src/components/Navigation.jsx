import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';  // AnimatePresence не нужен здесь
import { IoMenu, IoClose } from 'react-icons/io5';
import './Navigation.css';
import OrderForm from './Sections/OrderForm';

function Navigation({ currentSection, onSectionChange, setIsFormOpen }) {  // ← добавили пропс setIsFormOpen
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const leftLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'products', label: 'Продукция' },
    { id: 'clients', label: 'Клиенты' },
    { id: 'partners', label: 'Партнёры' },
  ];

  const rightLinks = [
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
        <div className="nav-side left desktop-only">
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
            <img 
              src="/logo-header.png" 
              alt="Мастер Мёда" 
              className="logo-image" 
            />
          </motion.div>
        </div>

        <div className="nav-side right desktop-only">
          {rightLinks.map(renderLink)}
          
          <a
            href="/price.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn price-btn"
            download="Прайс-лист Мастер Мёда 2025.pdf"
          >
            Посмотреть прайс
          </a>

          <motion.button
            className="nav-cta-btn request-btn"
            onClick={() => setIsFormOpen(true)}  // ← используем пропс
            whileHover={{ y: -2, color: "#FFF8DC" }}
            whileTap={{ scale: 0.95 }}
          >
            Отправить заявку
          </motion.button>
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {[...leftLinks, ...rightLinks].map(renderLink)}
          
          <a
            href="/price.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn price-btn mobile"
            download="Прайс-лист Мастер Мёда 2025.pdf"
          >
            Посмотреть прайс
          </a>

          <motion.button 
            className="nav-cta-btn request-btn mobile"
            onClick={() => { setIsFormOpen(true); setIsOpen(false); }}
            whileHover={{ y: -2, color: "#FFF8DC" }}
            whileTap={{ scale: 0.95 }}
          >
            Отправить заявку
          </motion.button>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
    </motion.nav>
  );
}

export default Navigation;
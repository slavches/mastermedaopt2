import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5';
import './Navigation.css';
import logoImg from '../assets/images/logo-header.png';
import OrderForm from './Sections/OrderForm';

function Navigation({ currentSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
        {/* ... левая часть и логотип без изменений ... */}

        <div className="nav-side desktop-only text-right">
          {rightLinks.map(renderLink)}
          
          {/* Новая кнопка 1 — Посмотреть прайс (ссылка на PDF) */}
          <a
            href="/price.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn price-btn"
          >
            Посмотреть прайс
          </a>

          {/* Кнопка 2 — Отправить заявку (модалка) */}
          <motion.button
            className="nav-cta-btn request-btn"
            onClick={() => setIsFormOpen(true)}
            whileHover={{ y: -2, color: "#FFF8DC" }}
            whileTap={{ scale: 0.95 }}
          >
            Отправить заявку
          </motion.button>
        </div>

        {/* Мобильное меню — тоже добавляем обе кнопки */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {[...leftLinks, ...rightLinks].map(renderLink)}
          
          <a
            href="/price-list-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn price-btn mobile"
          >
            Посмотреть прайс
          </a>
          
          <motion.button 
            className="nav-cta-btn request-btn mobile"
            onClick={() => { setIsFormOpen(true); setIsOpen(false); }}
          >
            Отправить заявку
          </motion.button>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Модалка с формой остаётся без изменений */}
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
              <h3>Отправить заявку на прайс-лист</h3>
              <OrderForm onSuccess={() => setIsFormOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navigation;
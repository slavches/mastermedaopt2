import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5';
import './Navigation.css';

const desktopLeftLinks = [
  { id: 'products', label: 'Продукция' },
  { id: 'work-process', label: 'Как работаем' },
];

const desktopRightLinks = [
  { id: 'why-us', label: 'Почему мы' },
  { id: 'about', label: 'О нас' },
];

const burgerMenuLinks = [
  { id: 'home', label: 'Главная' },
  { id: 'products', label: 'Продукция' },
  { id: 'work-process', label: 'Как работаем' },
  { id: 'why-us', label: 'Почему мы' },
  { id: 'clients', label: 'Клиенты' },
  { id: 'partners', label: 'Партнёры' },
  { id: 'news', label: 'Новости' },
  { id: 'about', label: 'О нас' },
];

function Navigation({ currentSection, onSectionChange, setIsFormOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (sectionId) => {
    onSectionChange(sectionId);
    setIsOpen(false);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderLink = (section) => (
    <button
      key={`${section.id}-${section.label}`}
      type="button"
      className={`nav-link ${currentSection === section.id ? 'active' : ''}`}
      onClick={() => handleNavClick(section.id)}
    >
      {section.label}
    </button>
  );

  return (
    <motion.nav
      className={`navigation ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-is-open' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="nav-blur-bg" />
      <div className="nav-container">
        <div className="nav-side left desktop-only">
          {desktopLeftLinks.map(renderLink)}
        </div>

        <div className="logo-wrapper">
          <div
            className="logo"
            role="button"
            tabIndex={0}
            onClick={() => handleNavClick('home')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('home');
              }
            }}
          >
            <img
              src="/logo-header.png"
              alt="Мастер Мёда"
              className="logo-image"
            />
          </div>
        </div>

        <div className="nav-side right desktop-only">
          {desktopRightLinks.map(renderLink)}
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`} role="menu">
          <div className="nav-links-inner">
            {burgerMenuLinks.map(renderLink)}

            <a
              href="/price.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta-btn price-btn menu-cta"
              download="Прайс-лист Мастер Мёда 2025.pdf"
            >
              Скачать прайс
            </a>

            <button
              type="button"
              className="nav-cta-btn request-btn menu-cta"
              onClick={() => {
                setIsFormOpen(true);
                setIsOpen(false);
              }}
            >
              Отправить заявку
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navigation;

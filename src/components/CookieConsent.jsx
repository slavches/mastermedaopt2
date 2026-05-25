import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './CookieConsent.css';

const CookieConsent = ({ onOpenPolicy, onOpenAgreement, onOpenCookiePolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  const openLegal = (handler) => {
    handler?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="cookie-banner-fix"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <div className="cookie-banner-content">
            <p>
              Продолжая использовать сайт, вы соглашаетесь с использованием cookie и обработкой персональных данных.
            </p>
            <div className="cookie-legal-links">
              <button type="button" onClick={() => openLegal(onOpenPolicy)}>
                Политика конфиденциальности
              </button>
              <button type="button" onClick={() => openLegal(onOpenCookiePolicy)}>
                Cookie Policy
              </button>
              <button type="button" onClick={() => openLegal(onOpenAgreement)}>
                Пользовательское соглашение
              </button>
            </div>
            <div className="cookie-banner-buttons">
              <button 
                className="btn-cookie secondary" 
                onClick={() => openLegal(onOpenPolicy)}
                type="button"
              >
                Подробнее
              </button>
              <button 
                className="btn-cookie primary" 
                onClick={handleAccept}
                type="button"
              >
                Принять
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
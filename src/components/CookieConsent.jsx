import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrivacyPolicy from './PrivacyPolicy'; 
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  useEffect(() => {
    // Если пользователь уже принимал куки, не показываем баннер
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

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="cookie-banner-fix"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{ zIndex: 9999 }}
          >
            <div className="cookie-banner-content">
              <p>
                Мы используем файлы cookie. Во время посещения сайта вы соглашаетесь с обработкой персональных данных.
              </p>
              <div className="cookie-banner-buttons">
                <button className="btn-cookie secondary" onClick={() => setIsPolicyOpen(true)}>
                  Подробнее
                </button>
                <button className="btn-cookie decline" onClick={handleDecline}>
                  Отклонить
                </button>
                <button className="btn-cookie primary" onClick={handleAccept}>
                  Принять
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Окно с текстом соглашения mastermedaopt.ru */}
      <PrivacyPolicy 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)} 
      />
    </>
  );
};

export default CookieConsent;
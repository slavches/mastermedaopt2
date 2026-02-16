import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CookieConsent.css';

const CookieConsent = ({ onOpenPolicy }) => { // ПРИНИМАЕМ ПРОПС ТУТ
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    console.log("Согласие принято"); // Для проверки в консоли
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="cookie-banner-fix"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Тот же тон, что в меню
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <div className="cookie-banner-content">
            <p>
              Мы используем файлы cookie. Во время посещения сайта вы соглашаетесь с обработкой персональных данных.
            </p>
            <div className="cookie-banner-buttons">
              <button 
                className="btn-cookie secondary" 
                onClick={onOpenPolicy}
                type="button"
              >
                Подробнее
              </button>
              <button 
                className="btn-cookie primary" 
                onClick={handleAccept} // ПРОВЕРЬ ЭТУ СТРОКУ
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
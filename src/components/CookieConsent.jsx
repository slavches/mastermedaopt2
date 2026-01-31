import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CookieConsent.css';


const CookieConsent = ({ onOpenPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, давал ли пользователь согласие ранее
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000); // Показываем через 2 секунды
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="cookie-consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="cookie-content">
            <p>
              Мы используем файлы cookie, чтобы улучшить работу сайта и сделать его удобнее. 
              Продолжая использовать сайт, вы соглашаетесь с нашей 
              <span className="cookie-link" onClick={onOpenPolicy} style={{cursor: 'pointer'}}> политикой конфиденциальности
            </span>.    
            </p>
            <button className="cookie-btn" onClick={handleAccept}>
              Принять
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CookieSettingsModal from './CookieSettingsModal';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-level');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent-level', 'all');
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem('cookie-consent-level', 'essential');
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
          >
            <div className="cookie-banner-content">
              <p>
                Во время посещения сайта вы соглашаетесь с тем, что мы обрабатываем ваши персональные данные с использованием метрических программ.
              </p>
              <div className="cookie-banner-buttons">
                <button className="btn-cookie secondary" onClick={() => setShowSettings(true)}>Подробнее</button>
                <button className="btn-cookie decline" onClick={handleDeclineAll}>Отклонить</button>
                <button className="btn-cookie primary" onClick={handleAcceptAll}>Принять</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookieSettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        onSave={() => setIsVisible(false)}
      />
    </>
  );
};

export default CookieConsent;
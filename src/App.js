import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Sections/Home';
import Products from './components/Sections/Products';
import Clients from './components/Sections/Clients';
import Partners from './components/Sections/Partners';
import News from './components/Sections/News';
import About from './components/Sections/About';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/PrivacyPolicy';
import OrderForm from './components/Sections/OrderForm';
import './styles/App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false); 
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState('default');

    const backgrounds = {
  default: 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 50%, #FFF8DC 100%)', // Главная
  linden: 'linear-gradient(135deg, #FFFACD 0%, #FFF8DC 50%, #FFFACD 100%)',  // О нас (светлый)
  buckwheat: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 50%, #DEB887 100%)', // Продукты
  acacia: 'linear-gradient(135deg, #FDF5E6 0%, #FAFAD2 50%, #FDF5E6 100%)',   // Клиенты
  partners: 'linear-gradient(135deg, #F5F5DC 0%, #E8E8AD 50%, #F5F5DC 100%)', // Партнеры
  news: 'linear-gradient(135deg, #FFF5E1 0%, #FFDAB9 50%, #FFF5E1 100%)',     // Новости

  };

  const [currentBg, setCurrentBg] = useState(backgrounds.default);

useEffect(() => {
  const element = document.getElementById(currentSection);
  
  // Добавляем проверку на наличие значения в style.top
  // Если там что-то есть, значит мы в процессе переключения скролла
  const isTransitioning = document.body.style.top !== '';
  const isLocked = document.body.style.position === 'fixed';

  if (element && currentSection !== 'home' && !isLocked && !isTransitioning) {
    const rect = element.getBoundingClientRect();
    // Увеличим порог до 50px, чтобы микро-сдвиги не провоцировали скролл
    const alreadyAtTarget = Math.abs(rect.top) < 50; 

    if (!alreadyAtTarget) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Логика смены фона
  const bgMap = {
    home: backgrounds.default,
    products: backgrounds.buckwheat,
    clients: backgrounds.acacia,
    partners: backgrounds.partners,
    news: backgrounds.news,
    about: backgrounds.linden
  };
  setCurrentBg(bgMap[currentSection] || backgrounds.default);
  
}, [currentSection]); // Оставляем currentSection
useEffect(() => {
if (isFormOpen || isPolicyOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.documentElement.classList.add('modal-open');
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.classList.remove('modal-open');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    }
  }, [isFormOpen, isPolicyOpen]);
  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    setCurrentSection('products');
  };

  const togglePolicy = () => {
    setIsPolicyOpen(true);
  };

  return (
    <div className="app">
      {/* Живой фон */}
      <motion.div
        className="app-background"
        animate={{ background: currentBg }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
      />

      {/* Навигация */}
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
        setIsFormOpen={setIsFormOpen} 
      />

      <div className="app-content">
        {/* Список секций (теперь они снова видны!) */}
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ willChange: 'opacity' }}
        >
          <Home id="home" />
          <Products id="products" onProductSelect={handleProductSelect} selectedProduct={selectedProduct} />
          <Clients id="clients" />
          <Partners id="partners" />
          <News id="news" />
          <About id="about" />
        </motion.div>

        <CookieConsent onOpenPolicy={togglePolicy} />

        {/* Модалка Политики Конфиденциальности */}
        <AnimatePresence>
          {isPolicyOpen && (
            <PrivacyPolicy 
              isOpen={isPolicyOpen} 
              onClose={() => setIsPolicyOpen(false)} 
            />
          )}
        </AnimatePresence>
      </div>

      {/* Модалка Заявки (OrderForm) */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="form-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              className="form-modal-content glass-morphism-heavy" // <-- Добавили класс
              /* Мы убрали отсюда все Blur и Background, они теперь в CSS */
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setIsFormOpen(false)}>
                ×
              </button>
              <div className="hero-form-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
                <OrderForm onSuccess={() => setIsFormOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
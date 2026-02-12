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
  const [selectedProduct, setSelectedProduct] = useState('default');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false); 
  const [isFormOpen, setIsFormOpen] = useState(false); 

  const backgrounds = {
    default: 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 50%, #FFF8DC 100%)',
    linden: 'linear-gradient(135deg, #FFFACD 0%, #FFF8DC 50%, #FFFACD 100%)',
    buckwheat: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 50%, #DEB887 100%)',
    acacia: 'linear-gradient(135deg, #FDF5E6 0%, #FAFAD2 50%, #FDF5E6 100%)',
    flower: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 50%, #FFE4B5 100%)',
  };

  const [currentBg, setCurrentBg] = useState(backgrounds.default);

  // Плавный скролл при клике в Navigation
  useEffect(() => {
    const element = document.getElementById(currentSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSection]);

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
          initial={{ opacity: 0 }}
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
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              className="form-modal-content"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setIsFormOpen(false)}>
                ×
              </button>
              <div className="hero-form-card" style={{ boxShadow: 'none', padding: 0 }}>
                <h3 style={{ marginTop: 0 }}>Отправить заявку</h3>
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
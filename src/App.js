import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Sections/Home';
import Products from './components/Sections/Products';
import Clients from './components/Sections/Clients';
import Partners from './components/Sections/Partners';
import News from './components/Sections/News';
import About from './components/Sections/About';
import './styles/App.css';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState('default');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false); // Состояние для окна
  const backgrounds = {
    default: 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 50%, #FFF8DC 100%)',
    linden: 'linear-gradient(135deg, #FFFACD 0%, #FFF8DC 50%, #FFFACD 100%)',
    buckwheat: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 50%, #DEB887 100%)',
    acacia: 'linear-gradient(135deg, #FDF5E6 0%, #FAFAD2 50%, #FDF5E6 100%)',
    flower: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 50%, #FFE4B5 100%)',
  };

  const [currentBg, setCurrentBg] = useState(backgrounds.default);

  useEffect(() => {
  }, [selectedProduct]);

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

  return (
    <div className="app">

      {/* Ускорили смену фона с 1.5с до 0.8с */}
        <motion.div
        className="app-background"
        animate={{ background: currentBg }}
        transition={{ duration: 0.8, ease: 'easeOut' }} // Это оставит мягкую смену цвета без капель
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
      />

      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
        
      />

      <div className="app-content">
        {/* Анимация появления контента при загрузке */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Home id="home" />
          <Products 
            id="products"
            onProductSelect={handleProductSelect}
            selectedProduct={selectedProduct}
          />
          <Clients id="clients" />
          <Partners id="partners" />
          <News id="news" />
          <About id="about" />
        </motion.div>
        <CookieConsent onOpenPolicy={() => setIsPolicyOpen(true)} />
          <PrivacyPolicy 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)}
          />
      </div>
    </div>
  );
}

export default App;
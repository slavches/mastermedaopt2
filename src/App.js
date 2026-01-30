import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Background from './components/Background';
import Home from './components/Sections/Home';
import Products from './components/Sections/Products';
import Clients from './components/Sections/Clients';
import Partners from './components/Sections/Partners';
import News from './components/Sections/News';
import About from './components/Sections/About';
import './styles/App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState('default');

  // Определяем цвета фона для каждого продукта
  const backgrounds = {
    default: 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 50%, #FFF8DC 100%)',
    linden: 'linear-gradient(135deg, #FFFACD 0%, #FFF8DC 50%, #FFFACD 100%)',
    buckwheat: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 50%, #DEB887 100%)',
    acacia: 'linear-gradient(135deg, #FDF5E6 0%, #FAFAD2 50%, #FDF5E6 100%)',
    flower: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 50%, #FFE4B5 100%)',
  };

  // Плавная смена фона при выборе продукта
  const [currentBg, setCurrentBg] = useState(backgrounds.default);

  useEffect(() => {
    setCurrentBg(backgrounds[selectedProduct] || backgrounds.default);
  }, [selectedProduct]); // eslint-disable-line react-hooks/exhaustive-deps

  // Прокрутка к секции при изменении
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
      {/* Фон с анимацией стекающего меда */}
      <Background selectedProduct={selectedProduct} />
      
      {/* Эффект отталкивания курсора */}
      {/* <CursorRepulsion /> */}

      {/* Навигация */}
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />

      {/* Динамический фон с плавной сменой */}
      <motion.div
        className="app-background"
        style={{ background: currentBg }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Основной контент */}
      <div className="app-content">
        <AnimatePresence mode="wait">
          <Home key="home" />
          <Products 
            key="products"
            onProductSelect={handleProductSelect}
            selectedProduct={selectedProduct}
          />
          <Clients key="clients" />
          <Partners key="partners" />
          <News key="news" />
          <About key="about" />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

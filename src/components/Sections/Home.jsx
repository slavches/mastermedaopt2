import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';

function Home() {
  return (
    <motion.section 
      id="home"
      className="section home-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-content">
        <div className="home-hero">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-text-block"
          >
            <span className="hero-badge">Прямые поставки от производителя</span>
            <h1 className="main-title">
              Натуральный мёд <br /> 
              <span>оптом по всей России</span>
            </h1>
            <p className="subtitle">
              Гарантируем качество ГОСТ и чистоту каждой партии. 
              Сбор 2025 года с лучших пасек Липецкой и Алтайской областей.
            </p>
            
            <div className="hero-features">
              <span>✓ От 100 кг до 20 тонн</span>
              <span>✓ Полный пакет документов</span>
              <span>✓ Быстрая отгрузка</span>
            </div>

            <div className="hero-buttons">
              <button 
                className="btn-primary" 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
              >
                Смотреть каталог
              </button>
              <button 
                className="btn-secondary"
                onClick={() => window.open('https://t.me/your_link', '_blank')}
              >
                Связаться в Telegram
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Home;
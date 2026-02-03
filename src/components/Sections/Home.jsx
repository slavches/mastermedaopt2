import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';
import OrderForm from './OrderForm'; // Проверь путь к файлу формы!

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
          {/* ЛЕВАЯ КОЛОНКА: ТЕКСТ */}
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
              <span>✓ От 15 кг до 20 тонн</span>
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
            </div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА: ФОРМА */}
          <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="hero-form-centered-wrapper"
    >
      <div className="hero-form-card">
        <h3>Получить оптовый прайс</h3>
        <OrderForm />
        
        <div className="form-divider">ИЛИ</div>
        
        <button 
          className="btn-telegram-wide"
          onClick={() => window.open('https://t.me/your_link', '_blank')}
        >
          Написать в Telegram
        </button>
      </div>
    </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Home;
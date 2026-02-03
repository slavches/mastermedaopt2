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
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-form-container"
          >
            <div className="hero-form-card">
              <h3>Получить прайс-лист</h3>
              <p>Оставьте заявку или напишите нам напрямую в мессенджер:</p>
              
              <OrderForm />

              <div className="form-divider">ИЛИ</div>

              <button 
                className="btn-telegram-wide"
                onClick={() => window.open('https://t.me/your_link', '_blank')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
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
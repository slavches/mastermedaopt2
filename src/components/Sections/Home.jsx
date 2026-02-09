import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';
import OrderForm from './OrderForm'; 

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
        <div className="home-hero-centered">
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="welcome-card"
          >
            {/* Надзаголовок для SEO-контекста */}
            <div className="welcome-badge">Прямые поставки мёда урожая 2025 года</div>
            
            {/* ГЛАВНЫЙ ЗАГОЛОВОК (H1) — Сделали упор на опт и производителя */}
            <h1 className="main-title">
              Натуральный мёд оптом <br /> 
              <span>от производителя Мастер Мёда</span>
            </h1>

            <div className="welcome-message">
              {/* Первый абзац с ключевыми фразами */}
              <p>
                Мы занимаемся заготовкой и оптовыми поставками мёда, вкладывая душу в каждый куботейнер. 
                Ежегодно собираем лучший мёд на пасеках <strong>Липецкой, Воронежской областей и Башкирии</strong>. 
                Продукция 2025 года полностью соответствует ГОСТу — это чистый, зрелый и ароматный продукт.
              </p>
              <p>
                Работаем официально через систему <strong>«Меркурий»</strong>. 
                Готовы обеспечить объемы от одного куботейнера (15-33 кг) до фуры. 
                Честное партнерство и прозрачные условия для вашего бизнеса.
              </p>
            </div>

            <div className="welcome-features">
              <div className="w-feature"><span>🍯</span> Поставки от 15 кг до 20 тонн</div>
              <div className="w-feature"><span>📄</span> Полный пакет документов</div>
              <div className="w-feature"><span>🚀</span> Отгрузка в день заказа</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-form-centered-wrapper"
          >
            <div className="hero-form-card">
              {/* H3 тоже важен для SEO структуры */}
              <h3>Запросить оптовый прайс-лист</h3>
              <OrderForm />
              
              <div className="form-divider">ИЛИ</div>

              <a 
                href="https://t.me/master_meda_bot"
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-telegram-wide"
              >
                <i className="fab fa-telegram-plane"></i>
                Написать в Telegram напрямую
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}

export default Home;
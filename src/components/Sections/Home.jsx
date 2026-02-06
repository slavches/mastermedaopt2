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
          
          {/* КАРТОЧКА-ПРИВЕТСТВИЕ */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="welcome-card"
          >
            <div className="welcome-badge">Привет! Мы на связи 👋</div>
            
            <h1 className="main-title">
              Настоящий мёд <br /> 
              <span>от друзей и для друзей</span>
            </h1>

            <div className="welcome-message">
              <p>
                Мы не просто занимаемся оптом, мы живем этим делом. 
                Каждое лето собираем мёд на лучших пасеках Липецкой, Воронежской областей и Башкирии. 
                Сбор 2025 года получился особенно удачным — ароматный, чистый и по всем канонам ГОСТа. 
              </p>
              <p>
                Всё официально, через «Меркурий», но по-человечески. 
                Нужен один куботейнер или целая фура? Договоримся!
              </p>
            </div>

            <div className="welcome-features">
              <div className="w-feature"><span>🍯</span> От 15 кг до 20 тонн</div>
              <div className="w-feature"><span>📄</span> Все документы</div>
              <div className="w-feature"><span>🚀</span> Быстрая отгрузка</div>
            </div>
          </motion.div>

          {/* БЛОК С ФОРМОЙ ЗАЯВКИ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-form-centered-wrapper"
          >
            <div className="hero-form-card">
              <h3>Получить оптовый прайс</h3>
              <OrderForm />
              
              <div className="form-divider">ИЛИ</div>
              
              <button 
                className="btn-telegram-wide"
                onClick={() => window.open('https://t.me/master_meda_bot', '_blank')}
              >
                Написать в Telegram напрямую
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}

export default Home;
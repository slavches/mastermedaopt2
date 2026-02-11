import 'swiper/css';
import 'swiper/css/effect-fade';
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import './Sections.css';
import OrderForm from './OrderForm';
import 'swiper/css/autoplay'; // Добавьте это, если используете autoplay

function Home() {
  const backgroundImages = [
    "/images/bg-honey-1.webp",
    "/images/bg-honey-2.webp",
    "/images/bg-honey-3.webp"
  ];

return (
  <motion.section 
    id="home"
    className="hero-with-slider" // Оставляем только этот класс для чистоты
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="hero-slider-background">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="hero-bg-swiper"
      >
        {backgroundImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div 
              className="hero-slide-item" 
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="hero-overlay"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {/* 2. КОНТЕНТ ПОВЕРХ СЛАЙДЕРА */}
      <div className="section-content relative-content">
        <div className="home-hero-centered">
          
          {/* ЛЕВАЯ ЧАСТЬ: ТЕКСТ */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="welcome-card"
          >
            <div className="welcome-badge">Прямые поставки мёда урожая 2025 года</div>
            
            <h1 className="main-title">
              Натуральный мёд оптом <br /> 
              <span>от производителя Мастер Мёда</span>
            </h1>

            <div className="welcome-message">
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
              <div className="w-feature">Поставки от 15 кг до 20 тонн</div>
              <div className="w-feature">Полный пакет документов</div>
              <div className="w-feature">Отгрузка в день заказа</div>
            </div>
          </motion.div>

          {/* ПРАВАЯ ЧАСТЬ: ФОРМА */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-form-centered-wrapper"
          >
            <div className="hero-form-card">
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
import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

function About() {
  const features = [
    { icon: '🌿', title: 'Экологичность', description: 'Мёд собирается с экологически чистых пасек' },
    { icon: '✅', title: 'Качество', description: 'Строгий контроль качества на всех этапах' },
    { icon: '🏆', title: 'Опыт', description: 'Более 10 лет на рынке оптовой продажи мёда' },
    { icon: '🚚', title: 'Доставка', description: 'Быстрая доставка по всей России' },
  ];

  return (
    <section id="about" className="section about-section">
      {/* Исправлено: теперь div закрывается правильно */}
      <div className="section-header">
        <motion.h2 
          className="section-title"

          viewport={{ once: true }}
        >
          О нас
        </motion.h2>
        <div className="title-divider"></div>
        <p className="section-subtitle">Мастер Мёда — качество, проверенное временем</p>
      </div> {/* Вот этого закрывающего тега не хватало! */}

      <div className="about-container">
        {/* Основной текстовый блок */}
        <motion.div

          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-glass-panel"
        >
          <div className="about-text">
            <p>
              <strong>"Мастер Мёда"</strong> — это компания, специализирующаяся на оптовой продаже натурального мёда 
              от проверенных производителей. Мы работаем напрямую с пасеками по всей России, 
              что позволяет нам гарантировать качество и свежесть продукции.
            </p>
            <p>
              Наша миссия — обеспечить доступ к настоящему, натуральному мёду для всех, кто ценит 
              качество и заботится о своём здоровье. Мы тщательно отбираем каждого поставщика и 
              контролируем качество на всех этапах — от сбора до доставки.
            </p>
          </div>
        </motion.div>

        {/* Сетка преимуществ */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }} 
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="feature-card glass-card"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* НОВЫЙ БЛОК: Контакты и Карта */}
        <div className="about-footer">
          <motion.div 
            className="about-location-info glass-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Где мы находимся?</h3>
            <div className="location-item">
              <span className="location-icon">📍</span>
              <p>Россия, Ленинградская область, Ломоносовский район, Виллозское городское поселение, Заречная улица, 2</p>
            </div>
            <div className="location-item">
              <span className="location-icon">⏰</span>
              <p>Пн-Пт: 09:00–17:00</p>
            </div>
            <div className="location-item">
              <span className="location-icon">📞</span>
              <p>+7 (906) 267-27-83</p>
            </div>
          </motion.div>

          <motion.div 
            className="about-map-wrapper glass-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Вставьте сюда ссылку из Яндекс.Карт (Поделиться -> Забрать код) */}
            <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae0fa24b73deb8c8a39355075e56ddd07191f492cd9d22f01cd9cfc293ef2ad36&amp;source=constructor"
              width="100%" 
              height="100%" 
              frameBorder="0"
              allowFullScreen={true}
              loading="lazy"
              title="yandex-map"
              style={{ 
                borderRadius: '15px',
                minHeight: '500px',
                border: 'none'
              }}
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
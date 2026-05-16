import React from 'react';
import { motion } from 'framer-motion';
import './Partners.css';

function Partners() {
  const partners = [
    { 
      name: 'Союз Пчеловодов России', 
      description: 'Официальный партнёр по сертификации и контролю стандартов продукции.', 
      logo: '/partners/soyuz.png' 
    },
    { 
      name: 'Эко-Ферма "Поля России"', 
      description: 'Наш ключевой поставщик экологически чистого сырья из заповедных зон.', 
      logo: '/partners/farm.png' 
    },
    { 
      name: 'Лаборатория качества', 
      description: 'Ежемесячный анализ каждой партии мёда на соответствие ГОСТ.', 
      logo: '/partners/lab.png' 
    },
    { 
      name: 'Быстрая доставка', 
      description: 'Надёжная логистика по всей России с соблюдением температурного режима.', 
      logo: '/partners/delivery.png' 
    },
  ];

  return (
    <section id="partners" className="section partners-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Наши Партнёры
        </motion.h2>
        <div className="title-divider"></div>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Мы работаем только с проверенными компаниями, гарантирующими качество
        </motion.p>
      </div>

      <div className="partners-grid">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            className="partner-card"
            initial={{ opacity: 0 }} // Убрали y: 30
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            style={{ willChange: "opacity" }} // Ускоряем рендер
          >
            <div className="partner-logo-box">
              <img src={partner.logo} alt={partner.name} className="partner-img" />
            </div>
            <h3>{partner.name}</h3>
            <p>{partner.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Partners;
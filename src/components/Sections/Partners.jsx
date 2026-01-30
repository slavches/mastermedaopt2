import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';

function Partners() {
  const partners = [
    { name: 'Союз Пчеловодов России', description: 'Официальный партнёр по сертификации продукции', logo: '🐝' },
    { name: 'Эко-Ферма "Поля России"', description: 'Поставщик экологически чистого сырья', logo: '🌾' },
    { name: 'Лаборатория качества мёда', description: 'Партнёр по контролю качества продукции', logo: '🔬' },
    { name: 'Транспортная компания "Быстрая доставка"', description: 'Логистический партнёр', logo: '🚚' },
  ];

  return (
    <section id="partners" className="section partners-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Наши Партнёры
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-description"
        >
          Мы работаем только с проверенными партнёрами, гарантирующими качество и надёжность
        </motion.p>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="partner-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="partner-logo">{partner.logo}</div>
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;

import React from 'react';
import { motion } from 'framer-motion';
import './About.css'; // Создадим отдельный файл для чистоты кода

function About() {
  const features = [
    { icon: '🌿', title: 'Экологичность', description: 'Мёд собирается с экологически чистых пасек' },
    { icon: '✅', title: 'Качество', description: 'Строгий контроль качества на всех этапах' },
    { icon: '🏆', title: 'Опыт', description: 'Более 10 лет на рынке оптовой продажи мёда' },
    { icon: '🚚', title: 'Доставка', description: 'Быстрая доставка по всей России' },
  ];

  return (
    <section id="about" className="section about-section">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            О Нас
          </motion.h2>
          <div className="title-divider"></div>
          <p className="section-subtitle">Мастер Мёда — качество, проверенное временем</p>

        <div className="about-container">
          {/* Основной текстовый блок в стеклянном стиле */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                className="feature-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
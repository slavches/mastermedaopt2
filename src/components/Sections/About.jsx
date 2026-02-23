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
      </div>
    </section>
  );
}

export default About;
import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';

function About() {
  const features = [
    { icon: '🌿', title: 'Экологичность', description: 'Мёд собирается с экологически чистых пасек' },
    { icon: '✅', title: 'Качество', description: 'Строгий контроль качества на всех этапах' },
    { icon: '🏆', title: 'Опыт', description: 'Более 10 лет на рынке оптовой продажи мёда' },
    { icon: '🚚', title: 'Доставка', description: 'Быстрая доставка по всей России' },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          О Нас
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="about-content"
        >
          <div className="about-text">
            <p>
              "Мастер Мёда" — это компания, специализирующаяся на оптовой продаже натурального мёда 
              от проверенных производителей. Мы работаем напрямую с пасеками по всей России, 
              что позволяет нам гарантировать качество и свежесть продукции.
            </p>
            <p>
              Наша миссия — обеспечить доступ к настоящему, натуральному мёду для всех, кто ценит 
              качество и заботится о своём здоровье. Мы тщательно отбираем каждого поставщика и 
              контролируем качество на всех этапах — от сбора до доставки.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

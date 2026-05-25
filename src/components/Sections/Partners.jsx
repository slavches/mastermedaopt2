import React from 'react';
import { motion } from 'framer-motion';
import './Partners.css';

function Partners() {
  const partners = [
    { 
      name: 'Оптовые поставки',
      description: 'Поставляем натуральный мёд партиями под потребности розницы, складов и производств.',
    },
    { 
      name: 'Фасовка под задачу клиента',
      description: 'Подбираем формат фасовки, объём и ассортимент под канал продаж и специфику бизнеса.',
    },
    { 
      name: 'Поставки для производств',
      description: 'Работаем с кондитерскими, пищевыми и HoReCa-проектами, где важна стабильность сырья.',
    },
    { 
      name: 'Сотрудничество с дистрибьюторами',
      description: 'Предлагаем понятные условия для компаний, развивающих продажи натурального мёда.',
    },
    {
      name: 'Региональные поставки',
      description: 'Организуем отгрузки в разные регионы России с учётом объёма и логистики.',
    },
    {
      name: 'Индивидуальные условия',
      description: 'Обсуждаем график поставок, документы, ассортимент и формат работы под клиента.',
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
          Форматы сотрудничества
        </motion.h2>
        <div className="title-divider"></div>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Выбирайте удобный формат B2B-взаимодействия: от разовой партии до регулярных поставок
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
            <span className="partner-card-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{partner.name}</h3>
            <p>{partner.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Partners;
import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';
import './WhyUs.css';

const advantages = [
  {
    title: 'Натуральный продукт',
    description:
      'Работаем только с натуральным мёдом без искусственных добавок и заменителей.',
  },
  {
    title: 'Документы и «Меркурий»',
    description:
      'Предоставляем полный пакет документов для оптовых поставок.',
  },
  {
    title: 'Оптовые объёмы',
    description:
      'Поставки от небольших партий до крупных оптовых объёмов.',
  },
  {
    title: 'Разные форматы фасовки',
    description:
      'Розничная фасовка, куботейнеры и оптовая тара.',
  },
  {
    title: 'Работаем по России',
    description:
      'Отправляем продукцию в разные регионы России.',
  },
  {
    title: 'Поддержка и консультация',
    description:
      'Помогаем подобрать фасовку, объёмы и условия поставки под задачу клиента.',
  },
];

function WhyUs({ onOpenForm }) {
  const handleOpenForm = (e) => {
    e.preventDefault();
    onOpenForm?.();
  };

  return (
    <section id="why-us" className="section why-us-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="title-divider" />
        <p className="section-subtitle">
          Надёжные поставки натурального мёда для бизнеса и оптовых покупателей
        </p>
      </motion.div>

      <ul className="why-us-grid">
        {advantages.map((item, index) => (
          <motion.li
            key={item.title}
            className="why-us-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
          >
            <h3 className="why-us-card-title">{item.title}</h3>
            <p className="why-us-card-text">{item.description}</p>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="why-us-cta-block"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <p className="why-us-cta-text">Получить оптовый прайс</p>
        <button
          type="button"
          className="btn-request-wide why-us-cta-btn"
          onClick={handleOpenForm}
        >
          Запросить прайс
        </button>
      </motion.div>
    </section>
  );
}

export default WhyUs;

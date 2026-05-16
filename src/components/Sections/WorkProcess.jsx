import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';
import './WorkProcess.css';

const steps = [
  {
    title: 'Заявка',
    description:
      'Оставьте заявку на сайте или свяжитесь с нами удобным способом.',
  },
  {
    title: 'Прайс и консультация',
    description:
      'Уточним объём, фасовку, регион поставки и отправим актуальный оптовый прайс.',
  },
  {
    title: 'Согласование',
    description:
      'Подберём позиции, обсудим условия, документы и формат отгрузки.',
  },
  {
    title: 'Отгрузка',
    description:
      'Подготовим заказ, оформим документы и передадим товар в доставку.',
  },
];

function WorkProcess({ onOpenForm }) {
  const handleOpenForm = (e) => {
    e.preventDefault();
    onOpenForm?.();
  };

  return (
    <section id="work-process" className="section work-process-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Как мы работаем</h2>
        <motion.div className="title-divider" />
        <p className="section-subtitle">
          Понятный процесс оптовой поставки — от заявки до отгрузки
        </p>
      </motion.div>

      <ol className="work-process-grid">
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            className="work-process-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
          >
            <span className="work-process-step" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="work-process-card-title">{step.title}</h3>
            <p className="work-process-card-text">{step.description}</p>
          </motion.li>
        ))}
      </ol>

      <div className="work-process-cta">
        <button
          type="button"
          className="btn-request-wide work-process-cta-btn"
          onClick={handleOpenForm}
        >
          Оставить заявку
        </button>
      </div>
    </section>
  );
}

export default WorkProcess;

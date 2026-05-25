import React from 'react';
import { motion } from 'framer-motion';
import './Clients.css';

function Clients() {
  const clients = [
    {
      name: 'Розничные магазины',
      description: 'Поставки фасованного натурального мёда для розничных точек и локальных сетей.',
    },
    {
      name: 'Оптовые базы',
      description: 'Стабильные партии мёда в оптовой таре для складов и торговых компаний.',
    },
    {
      name: 'Маркетплейсы',
      description: 'Фасовка и ассортимент для онлайн-продаж с понятными документами и поставками.',
    },
    {
      name: 'Кофейни и HoReCa',
      description: 'Натуральный мёд для напитков, десертов, завтраков и фирменных меню.',
    },
    {
      name: 'Кондитерские производства',
      description: 'Мёд для рецептур, начинок, выпечки и регулярного производственного потребления.',
    },
    {
      name: 'Фасовочные компании',
      description: 'Оптовые объёмы и тара для дальнейшей фасовки под задачу клиента.',
    },
  ];

  return (
    <section id="clients" className="section clients-section">
      {/* ОБНОВЛЕННЫЙ ЗАГОЛОВОК В ЕДИНОМ СТИЛЕ */}
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Кому поставляем
        </motion.h2>
        <div className="title-divider"></div>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Работаем с B2B-клиентами, которым важны стабильные поставки, документы и натуральное качество
        </motion.p>
      </div>

      <div className="clients-grid">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            className="client-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="client-card-content">
              <span className="client-card-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{client.name}</h3>
              <p>{client.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Clients;
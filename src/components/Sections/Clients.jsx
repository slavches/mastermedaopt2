import React from 'react';
import { motion } from 'framer-motion';
import './Sections.css';

function Clients() {
  const clients = [
    { name: 'Сеть магазинов "Здоровье"', logo: '🏪' },
    { name: 'Ресторан "Медовый Дом"', logo: '🍽️' },
    { name: 'Интернет-магазин "Натуральные продукты"', logo: '🛒' },
    { name: 'Фармацевтическая компания "БиоМед"', logo: '💊' },
    { name: 'Кафе "Пчелиный улей"', logo: '☕' },
    { name: 'Супермаркет "Эко-Маркет"', logo: '🛍️' },
  ];

  return (
    <section id="clients" className="section clients-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Наши Клиенты
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-description"
        >
          Мы гордимся сотрудничеством с ведущими компаниями в сфере розничной торговли и общественного питания
        </motion.p>
        <div className="clients-grid">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="client-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="client-logo">{client.logo}</div>
              <h3>{client.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;

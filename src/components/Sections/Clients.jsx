import React from 'react';
import { motion } from 'framer-motion';
import './Clients.css';

function Clients() {
  const clients = [
    { name: 'Сеть магазинов "Лента"', img: '/images/clients/shop.jpg' },
    { name: 'Ресторан "Медовый Дом"', img: '/images/clients/restaurant.png' },
    { name: 'Интернет-магазин "Натуральные продукты"', img: '/images/clients/online-shop.png' },
    { name: 'Фармацевтическая компания "БиоМед"', img: '/images/clients/pharma.jpg' },
    { name: 'Кафе "Пчелиный улей"', img: '/images/clients/cafe.jpg' },
    { name: 'Супермаркет "Эко-Маркет"', img: '/images/clients/eco.png' },
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
          Наши Клиенты
        </motion.h2>
        <div className="title-divider"></div>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Мы гордимся сотрудничеством с лидерами рынка и гарантируем качество каждой партии
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
            <div className="client-image-wrapper">
              <img src={client.img} alt={client.name} className="client-photo" />
              <div className="client-overlay">
                <h3>{client.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Clients;
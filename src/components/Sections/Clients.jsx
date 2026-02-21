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
          Мы гордимся сотрудничеством с лидерами рынка
        </motion.p>

        <div className="clients-grid">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="client-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
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
      </div>
    </section>
  );
}

export default Clients;
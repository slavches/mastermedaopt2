import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Sections.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Имитация получения новостей из Telegram
  // В реальном приложении здесь будет API запрос к Telegram каналу
  useEffect(() => {
    // Симуляция загрузки новостей
    setTimeout(() => {
      setNews([
        {
          id: 1,
          title: 'Новый урожай липового мёда 2025',
          date: '25.01.2025',
          content: 'Рады сообщить о поступлении свежего липового мёда урожая 2025 года. Мёд собран с экологически чистых пасек в Липецкой области.',
          image: '🍯'
        },
        {
          id: 2,
          title: 'Специальное предложение для оптовиков',
          date: '20.01.2025',
          content: 'При заказе от 100 кг мёда - скидка 15%. Акция действует до конца месяца.',
          image: '💰'
        },
        {
          id: 3,
          title: 'Открытие нового склада в Москве',
          date: '15.01.2025',
          content: 'Теперь мы можем обеспечить быструю доставку мёда в Москве и Московской области.',
          image: '🏢'
        },
        {
          id: 4,
          title: 'Сертификация продукции',
          date: '10.01.2025',
          content: 'Вся наша продукция прошла сертификацию и соответствует ГОСТам качества.',
          image: '✅'
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <section id="news" className="section news-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Новости из Telegram
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-description"
        >
          Следите за нашими обновлениями и акциями в Telegram канале
        </motion.p>
        {loading ? (
          <div className="loading">Загрузка новостей...</div>
        ) : (
          <div className="news-grid">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                className="news-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="news-image">{item.image}</div>
                <div className="news-content">
                  <div className="news-date">{item.date}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default News;

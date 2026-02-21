import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const CHANNEL_NAME = 'mastermedaspb'; 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tg.i-c-a.su/rss/${CHANNEL_NAME}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
          const items = data.items.slice(0, 6).map((item, index) => {
            // Очищаем текст от HTML-тегов и лишних символов
            const cleanText = item.description
              .replace(/<[^>]*>?/gm, '') 
              .replace(/&nbsp;/g, ' ')
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&');

            return {
              id: index,
              // Если заголовка нет, используем дату как заголовок или стандартную фразу
              title: item.title && item.title !== CHANNEL_NAME ? item.title : 'Обновление в канале',
              date: new Date(item.pubDate).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }),
              content: cleanText.slice(0, 180) + '...', // Увеличили лимит текста, раз нет фото
              link: item.link
            };
          });
          setNews(items);
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [CHANNEL_NAME]);

  return (
    <section id="news" className="section news-section">
      <div className="section-content">
        <h2 className="section-title">Свежее в Telegram</h2>
        <p className="section-description">Последние новости с пасек и актуальные остатки мёда</p>
        
        {loading ? (
          <div className="loading">Синхронизация с лентой...</div>
        ) : (
          <div className="news-grid-text">
            {news.map((item, index) => (
              <motion.article 
                key={index} 
                className="news-card-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="news-header">
                  <span className="news-badge">TG News</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <a href={item.link} target="_blank" rel="noreferrer" className="tg-link-simple">
                  Читать полностью <span className="arrow">→</span>
                </a>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default News;
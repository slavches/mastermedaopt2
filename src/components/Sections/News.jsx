import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Укажите здесь ваш логин канала (без @)
  const CHANNEL_NAME = 'mastermedaspb'; 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Используем бесплатный сервис-мост для получения постов в формате JSON
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tg.i-c-a.su/rss/${CHANNEL_NAME}`);
        const data = await response.json();

        if (data.status === 'ok') {
          const items = data.items.slice(0, 6).map((item, index) => {
            // Пытаемся вытащить картинку из контента, если её нет — ставим заглушку
            const imgRegExp = /<img[^>]+src="([^">]+)"/;
            const match = item.content.match(imgRegExp);
            const imageUrl = match ? match[1] : '/images/news-placeholder.jpg';

            return {
              id: index,
              title: item.title || 'Новость компании',
              date: new Date(item.pubDate).toLocaleDateString('ru-RU'),
              content: item.description.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...', // чистим HTML теги
              image: imageUrl,
              link: item.link
            };
          });
          setNews(items);
        }
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section id="news" className="section news-section">
      <div className="section-content">
        <h2 className="section-title">Новости из Telegram</h2>
        <p className="section-description">Свежие события с наших пасек и выгодные предложения</p>
        
        {loading ? (
          <div className="loading">Синхронизация с каналом...</div>
        ) : (
          <div className="news-grid">
            {news.map((item, index) => (
              <motion.article 
                key={item.id} 
                className="news-card"
                whileHover={{ y: -5 }}
              >
                <div className="news-img-container">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="news-body">
                  <div className="news-date">{item.date}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="tg-link">Читать в Telegram →</a>
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
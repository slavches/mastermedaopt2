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
        // Используем проверенный мост i-c-a.su
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tg.i-c-a.su/rss/${CHANNEL_NAME}`);
        const data = await response.json();
        
        console.log("Данные из TG:", data); // Посмотрите в консоль F12, если тут пусто

        if (data.status === 'ok' && data.items) {
          const items = data.items.slice(0, 6).map((item, index) => {
            
            // Пытаемся вытащить картинку из разных полей
            let imageUrl = item.enclosure?.link || item.thumbnail;
            
            if (!imageUrl) {
              // Ищем картинку в описании через регулярку
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              imageUrl = imgMatch ? imgMatch[1] : null;
            }

            // Очистка текста от HTML и странных символов
            const cleanText = item.description
              .replace(/<[^>]*>?/gm, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&quot;/g, '"');

            return {
              id: index,
              title: item.title && item.title !== CHANNEL_NAME ? item.title : 'Новость пасеки',
              date: new Date(item.pubDate).toLocaleDateString('ru-RU'),
              content: cleanText.slice(0, 120) + '...',
              image: imageUrl,
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
        <h2 className="section-title">Новости из Telegram</h2>
        
        {loading ? (
          <div className="loading">Загрузка ленты...</div>
        ) : news.length === 0 ? (
          <div className="loading">Новостей пока нет или канал недоступен</div>
        ) : (
          <div className="news-grid">
            {news.map((item, index) => (
              <motion.article 
                key={index} 
                className="news-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="news-img-container">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt="" 
                      onError={(e) => {
                        // Если картинка не прогрузилась (403 ошибка), заменяем на мед
                        e.target.onerror = null; 
                        e.target.src = "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500";
                      }}
                    />
                  ) : (
                    <div className="no-image-placeholder">🍯</div>
                  )}
                </div>
                <div className="news-body">
                  <div className="news-date">{item.date}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="tg-link">
                    Перейти в канал →
                  </a>
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
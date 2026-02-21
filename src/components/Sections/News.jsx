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
        // Используем проверенный мост
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tg.i-c-a.su/rss/${CHANNEL_NAME}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
          const items = data.items.slice(0, 6).map((item, index) => {
            
            // Ищем картинку в разных полях, которые отдает Telegram
            let imageUrl = item.enclosure?.link || item.thumbnail;
            
            if (!imageUrl) {
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              imageUrl = imgMatch ? imgMatch[1] : null;
            }

            // Очистка текста
            const cleanText = item.description
              .replace(/<[^>]*>?/gm, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&quot;/g, '"');

            return {
              id: index,
              title: item.title && item.title !== CHANNEL_NAME ? item.title : 'Новость из канала',
              date: new Date(item.pubDate).toLocaleDateString('ru-RU'),
              content: cleanText.slice(0, 140) + '...',
              image: imageUrl,
              link: item.link
            };
          });
          setNews(items);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [CHANNEL_NAME]);

  return (
    <section id="news" className="section news-section">
      <div className="section-content">
        <h2 className="section-title">Следите за нами в Telegram</h2>
        
        {loading ? (
          <div className="loading">Обновляем ленту новостей...</div>
        ) : (
          <>
            <div className="news-grid">
              {news.map((item, index) => (
                <motion.article 
                  key={index} 
                  className="news-card glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="news-image-box">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500"} 
                      alt="" 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=500";
                      }}
                    />
                  </div>
                  <div className="news-body">
                    <span className="news-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <a href={item.link} target="_blank" rel="noreferrer" className="read-more-btn">
                      Читать статью в TG →
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="tg-footer-cta">
               <p>Все самые свежие отчеты с пасек и акции — в нашем основном канале</p>
               <a href={`https://t.me/${CHANNEL_NAME}`} target="_blank" rel="noreferrer" className="tg-main-link">
                 Подписаться на Master Мёда
               </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default News;
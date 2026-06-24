import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const CHANNEL_NAME = 'mastermedaspb'; 

  useEffect(() => {
    const manualImages = {
      0: '/images/news-main.jpg',
      1: '/images/news-main1.jpg',
      2: '/images/news-main2.jpg',
      3: '/images/news-main3.jpg',
      4: '/images/news-main4.jpg',
      5: '/images/news-main5.jpg',
    };

    const fetchNews = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tg.i-c-a.su/rss/${CHANNEL_NAME}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
          const items = data.items.slice(0, 6).map((item, index) => {
            
            const filterContent = (text) => {
              return (text || "")
                .replace(/\[Photo\]/g, '')
                .replace(/\[Video\]/g, '')
                .replace(/\[Media\]/g, '')
                .replace(/\[File\]/g, '')
                .replace(/<[^>]*>?/gm, '') 
                .replace(/&nbsp;/g, ' ')
                .replace(/&quot;/g, '"')
                .trim();
            };

            const cleanTitle = filterContent(item.title);
            const cleanText = filterContent(item.description);

            return {
              id: index,
              title: cleanTitle && cleanTitle !== CHANNEL_NAME ? cleanTitle : 'Новость пасеки',
              date: new Date(item.pubDate).toLocaleDateString('ru-RU'),
              content: cleanText.slice(0, 140) + '...',
              link: item.link,
              image: manualImages[index] || "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500",
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
      {/* ПРИВОДИМ К ЕДИНОМУ СТИЛЮ ЗАГОЛОВОК */}
      <div className="section-header">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Новости
        </motion.h2>
        <div className="title-divider"></div>
        <p className="section-subtitle">Следите за жизнью нашей пасеки в режиме реального времени</p>
      </div>
        
      {loading ? (
        <div className="loading" style={{textAlign: 'center', color: 'var(--color-honey)', padding: '40px'}}>
          Обновляем ленту новостей...
        </div>
      ) : (
        <>
          <div className="news-grid">
            {news.map((item, index) => (
              <motion.article 
                key={index} 
                className="glass-card" /* ИСПРАВЛЕНО: класс в соответствии с твоим CSS */
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="news-image-box">
                  <img 
                    src={item.image} 
                    alt={item.title} 
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
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="read-more-btn">
                    Читать в Telegram →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div 
            className="tg-footer-cta"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="tg-icon-circle">
              <svg viewBox="0 0 24 24" width="30" height="30">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.38-.89.03-.25.38-.51 1.07-.78 4.21-1.83 7.02-3.03 8.43-3.61 4.02-1.66 4.86-1.95 5.41-1.95.12 0 .39.03.56.17.14.11.18.28.2.43.02.06.03.13.02.21z" />
              </svg>
            </div>
            <div className="tg-footer-content">
              <p>Все самые свежие новости — в нашем канале</p>
              <a href={`https://t.me/${CHANNEL_NAME}`} target="_blank" rel="noopener noreferrer" className="tg-main-link">
                Подписаться на Мастер Мёда
              </a>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}

export default News;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const CHANNEL_NAME = 'mastermedaspb'; 

  useEffect(() => {
    // Создайте объект соответствия (какое фото к какому индексу новости)
const manualImages = {
  0: '/images/news-main.webp', // Для самой свежей новости
  1: '/images/news-main1.jpg', // Для второй
  2: '/images/news-main3.jpg',
  3: '/images/news-main1.jpg',
  4: '/images/news-main4.jpg',
  5: '/images/news-main2.jpg',
};
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
            const cleanTitle = (item.title || "")
            .replace(/\[Photo\]/g, '')
            .replace(/\[Video\]/g, '')
            .replace(/\[Media\]/g, '')
            .replace(/\[File\]/g, '')
            .trim(); // Удаляем лишние пробелы по краям

            // 2. Очищаем основной текст (description)
            const cleanText = (item.description || "")
              .replace(/\[Photo\]/g, '') // Убираем [Photo]
              .replace(/\[Video\]/g, '') // Убираем [Video]
              .replace(/\[Media\]/g, '') // Убираем [Media]
              .replace(/<[^>]*>?/gm, '')  // Удаляем HTML теги
              .replace(/&nbsp;/g, ' ')
              .replace(/&quot;/g, '"')
              .trim();

            return {
              id: index,
              // Используем очищенный заголовок. 
              // Если после очистки заголовок стал пустым или совпал с названием канала, ставим свой.
              title: cleanTitle && cleanTitle !== CHANNEL_NAME ? cleanTitle : 'Новость пасеки',
              date: new Date(item.pubDate).toLocaleDateString('ru-RU'),
              content: cleanText.slice(0, 140) + '...',
              link: item.link,
              image: manualImages[index] || "https://unsplash.com/photos/honey-jar-with-honey-comb-yQzrDgU-KAI",
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
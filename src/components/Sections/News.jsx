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
        // Запрос к RSS-мосту через сервис rss2json
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tg.snotra.org/rss/${CHANNEL_NAME}`);
        const data = await response.json();

        if (data.status === 'ok') {
          const items = data.items.slice(0, 6).map((item, index) => {
  
  // 1. Пытаемся найти картинку везде, где она может быть
  let imageUrl = null;

  // Ищем в поле enclosure
  if (item.enclosure?.link) {
    imageUrl = item.enclosure.link;
  }

  // Если нет, ищем регуляркой во всех полях текста
  if (!imageUrl) {
    const imgRegExp = /src="([^">]+)"/; // Упростили регулярку для надежности
    const searchString = (item.content || "") + (item.description || "");
    const match = searchString.match(imgRegExp);
    imageUrl = match ? match[1] : null;
  }

  // 2. Если фото всё ещё нет, проверим, нет ли ссылки в самом объекте (некоторые мосты так делают)
  if (!imageUrl && item.thumbnail) {
    imageUrl = item.thumbnail;
  }

  return {
    id: index,
    title: item.title && item.title !== CHANNEL_NAME ? item.title : 'Новость компании',
    date: new Date(item.pubDate).toLocaleDateString('ru-RU'),
    content: (item.description || "")
      .replace(/<[^>]*>?/gm, '') 
      .slice(0, 150) + '...',
    image: imageUrl, // Если здесь null, картинка просто не отобразится (пустой блок)
    link: item.link
  };
});
          setNews(items);
        }
      } catch (error) {
        console.error("Ошибка синхронизации с Telegram:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [CHANNEL_NAME]); // Все лишние скобки и дубликаты вызовов удалены

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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="news-img-container">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="news-body">
                  <div className="news-date">{item.date}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="tg-link">
                    Читать в Telegram →
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
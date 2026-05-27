import React from 'react';
import articlesData from '../data/articlesData';
import './ArticlePage.css';

function ArticlePage({ slug, onBackToArticles, onOpenForm }) {
  const article = articlesData.find((item) => item.slug === slug);

  if (!article) {
    return (
      <main className="article-page">
        <section className="article-page-inner article-not-found">
          <h1>Статья не найдена</h1>
          <p>Возможно, материал был перемещён или ссылка указана с ошибкой.</p>
          <button type="button" className="article-page-back" onClick={onBackToArticles}>
            Назад к статьям
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="article-page">
      <article className="article-page-inner">
        <button type="button" className="article-page-back" onClick={onBackToArticles}>
          Назад к статьям
        </button>

        <header className="article-page-header">
          <span className="article-page-category">{article.category}</span>
          <h1>{article.title}</h1>
          <time>{article.date}</time>
          <p>{article.description}</p>
        </header>

        <div className="article-page-image">
          <img src={article.image} alt={article.title} loading="eager" decoding="async" />
        </div>

        <div className="article-page-content">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className="article-page-cta">
          <div>
            <h2>Нужна оптовая поставка мёда?</h2>
            <p>Подберём формат, объём и документы под задачу вашего бизнеса.</p>
          </div>
          <button type="button" className="article-page-cta-btn" onClick={onOpenForm}>
            Запросить оптовый прайс
          </button>
        </section>
      </article>
    </main>
  );
}

export default ArticlePage;

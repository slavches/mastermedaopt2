import React from 'react';
import { motion } from 'framer-motion';
import articlesData from '../data/articlesData';
import './ArticlesPage.css';

function ArticleCard({ article, onRead }) {
  return (
    <article className="article-card">
      <div className="article-image-wrap">
        <img src={article.image} alt={article.title} loading="lazy" decoding="async" />
      </div>
      <div className="article-card-body">
        <span className="article-category">{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <div className="article-card-footer">
          <time>{article.date}</time>
          <button type="button" className="article-read-btn" onClick={() => onRead(article.slug)}>
            Читать
          </button>
        </div>
      </div>
    </article>
  );
}

export function ArticlesPreview({ onOpenArticles, onOpenArticle }) {
  const previewArticles = articlesData.slice(0, 3);

  return (
    <section className="section articles-preview-section" id="articles-preview">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          Полезные статьи
        </motion.h2>
        <div className="title-divider"></div>
        <p className="section-subtitle">
          Коротко о качестве мёда, документах и оптовых поставках для бизнеса
        </p>
      </div>

      <div className="articles-grid articles-grid-preview">
        {previewArticles.map((article) => (
          <ArticleCard key={article.title} article={article} onRead={onOpenArticle} />
        ))}
      </div>

      <div className="articles-preview-actions">
        <button type="button" className="articles-all-btn" onClick={onOpenArticles}>
          Все статьи
        </button>
      </div>
    </section>
  );
}

function ArticlesPage({ onBack, onOpenArticle }) {
  return (
    <main className="articles-page">
      <div className="articles-page-inner">
        <div className="articles-page-header">
          <button type="button" className="articles-back-btn" onClick={onBack}>
            На главную
          </button>
          <h1>Полезные статьи</h1>
          <p>
            Материалы для оптовых покупателей, магазинов, производств и HoReCa о натуральном мёде,
            документах и показателях качества.
          </p>
        </div>

        <div className="articles-grid">
          {articlesData.map((article) => (
            <ArticleCard key={article.title} article={article} onRead={onOpenArticle} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default ArticlesPage;

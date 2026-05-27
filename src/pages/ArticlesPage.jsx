import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          <button type="button" className="article-read-btn" onClick={() => onRead(article)}>
            Читать
          </button>
        </div>
      </div>
    </article>
  );
}

export function ArticlesPreview({ onOpenArticles }) {
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
          <ArticleCard key={article.title} article={article} onRead={onOpenArticles} />
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

function ArticlesPage({ onBack }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

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
            <ArticleCard key={article.title} article={article} onRead={setSelectedArticle} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="article-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.article
              className="article-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="article-modal-close"
                onClick={() => setSelectedArticle(null)}
                aria-label="Закрыть статью"
              >
                ×
              </button>
              <span className="article-category">{selectedArticle.category}</span>
              <h2>{selectedArticle.title}</h2>
              <time>{selectedArticle.date}</time>
              {selectedArticle.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default ArticlesPage;

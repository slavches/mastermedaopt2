import React from 'react';
import './Footer.css';

const footerNavLinks = [
  { id: 'products', label: 'Продукция' },
  { id: 'work-process', label: 'Как работаем' },
  { id: 'why-us', label: 'Почему мы' },
  { id: 'about', label: 'О нас' },
];

const legalLinks = [
  { id: 'agreement', label: 'Пользовательское соглашение' },
  { id: 'privacy', label: 'Политика конфиденциальности' },
  { id: 'personal-data', label: 'Согласие на обработку ПД' },
  { id: 'cookies', label: 'Cookie Policy' },
];

function Footer({ onSectionChange, onOpenLegal }) {
  const handleSectionClick = (sectionId) => {
    onSectionChange?.(sectionId);
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-column">
          <h2 className="footer-heading">Навигация</h2>
          <nav className="footer-link-list" aria-label="Навигация в подвале">
            {footerNavLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className="footer-link"
                onClick={() => handleSectionClick(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Контакты</h2>
          <div className="footer-contact-list">
            <div>
              <span className="footer-label">Телефон:</span>
              <a href="tel:+79062672783" className="footer-link">+7 (906) 267-27-83</a>
            </div>
            <div>
              <span className="footer-label">Email:</span>
              <a href="mailto:med.spb@list.ru" className="footer-link">med.spb@list.ru</a>
            </div>
            <div>
              <span className="footer-label">Telegram-бот:</span>
              <a
                href="https://t.me/master_meda_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                @master_meda_bot
              </a>
            </div>
            <div>
              <span className="footer-label">Город:</span>
              <span className="footer-text">Санкт-Петербург</span>
            </div>
          </div>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Документы</h2>
          <div className="footer-link-list">
            {legalLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className="footer-link"
                onClick={() => onOpenLegal?.(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="footer-column footer-details">
          <h2 className="footer-heading">Реквизиты</h2>
          <p>ТК «Мастер Мёда»</p>
          <p>ИНН 7807381332</p>
          <p>ОГРН 1137847231961</p>
          <p>
            <span className="footer-label">Генеральный директор:</span>
            Артемов Святослав Сергеевич
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ТК «Мастер Мёда». Все права защищены.</p>
        <p>Использование материалов сайта возможно только с письменного разрешения правообладателя.</p>
      </div>
    </footer>
  );
}

export default Footer;

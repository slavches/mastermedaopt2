import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './CookieSettingsModal.css';

const CookieSettingsModal = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [consents, setConsents] = useState({
    functional: false,
    analytics: true,
    performance: true,
    advertising: false,
    uncategorized: false
  });

  if (!isOpen) return null;

  const toggleTab = (tab) => setActiveTab(activeTab === tab ? null : tab);

  const categories = [
    {
      id: 'essential',
      title: 'Необходимые',
      desc: 'Необходимые файлы cookie требуются для включения основных функций этого сайта, таких как обеспечение безопасного входа или настройка ваших предпочтений. Эти файлы cookie не хранят никаких персональных данных.',
      alwaysActive: true,
      cookies: [
        { name: '_GRECAPTCHA', time: '6 months', desc: 'Google Recaptcha protection against spam.' },
        { name: 'cookieyes-consent', time: '1 year', desc: 'Remembers consent preferences.' },
        { name: 'woocommerce_cart_hash', time: 'session', desc: 'WooCommerce cart tracking.' }
      ]
    },
    {
      id: 'analytics',
      title: 'Аналитика',
      desc: 'Аналитические файлы cookie используются для понимания того, как посетители взаимодействуют с веб-сайтом. Помогают отслеживать количество посетителей и источники трафика.',
      cookies: [
        { name: '_ym_uid', time: '1 year', desc: 'Yandex Metrica user identification.' },
        { name: 'yandexuid', time: '1 year', desc: 'Yandex user identification.' },
        { name: 'sbjs_current', time: 'session', desc: 'Sourcebuster visit source tracking.' }
      ]
    },
    {
      id: 'performance',
      title: 'Производительность',
      desc: 'Используются для понимания и анализа ключевых показателей производительности веб-сайта.',
      cookies: [
        { name: 'ymex', time: '1 year', desc: 'Yandex user behavior analysis.' },
        { name: '_yasc', time: '10 years', desc: 'Yandex Metrica visitor interaction tracking.' }
      ]
    },
    {
      id: 'advertising',
      title: 'Реклама',
      desc: 'Используются для предоставления персонализированной рекламы и анализа эффективности кампаний.',
      cookies: [
        { name: 'remixlang', time: '1 year', desc: 'VKontakte advertising cookie.' },
        { name: 'i', time: '1 year', desc: 'OpenX anonymized user data recording.' }
      ]
    }
  ];

  return (
    <div className="cookie-modal-overlay" onClick={onClose}>
      <motion.div 
        className="cookie-modal-card" 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cookie-modal-header">
          <h3>Политика использования файлов cookie</h3>
          <button className="close-x" onClick={onClose}><IoClose /></button>
        </div>

        <div className="cookie-modal-body">
          <p className="modal-intro">Мы используем файлы cookie, чтобы помочь вам эффективно перемещаться по сайту и выполнять определенные функции. Подробную информацию вы найдете ниже.</p>
          
          <div className="cookie-categories">
            {categories.map((cat) => (
              <div key={cat.id} className="cat-item">
                <div className="cat-header" onClick={() => toggleTab(cat.id)}>
                  <div className="cat-title-block">
                    {activeTab === cat.id ? <IoChevronUp /> : <IoChevronDown />}
                    <span>{cat.title}</span>
                  </div>
                  {cat.alwaysActive ? (
                    <span className="always-active-text">Всегда активны</span>
                  ) : (
                    <label className="switch" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={consents[cat.id]} 
                        onChange={() => setConsents({...consents, [cat.id]: !consents[cat.id]})}
                      />
                      <span className="slider"></span>
                    </label>
                  )}
                </div>
                
                <AnimatePresence>
                  {activeTab === cat.id && (
                    <motion.div 
                      className="cat-details" 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p className="cat-desc">{cat.desc}</p>
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr><th>Cookie</th><th>Срок</th><th>Описание</th></tr>
                          </thead>
                          <tbody>
                            {cat.cookies.map(c => (
                              <tr key={c.name}>
                                <td className="font-mono">{c.name}</td>
                                <td>{c.time}</td>
                                <td>{c.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="cookie-modal-footer">
          <button className="btn-save-settings" onClick={() => { localStorage.setItem('cookie-consent-level', 'custom'); onSave(); onClose(); }}>
            Сохранить настройки
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CookieSettingsModal;
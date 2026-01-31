import React from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import './PrivacyPolicy.css';

const PrivacyPolicy = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="policy-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="policy-modal"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <button className="policy-close" onClick={onClose}><IoClose /></button>
        
        <div className="policy-content">
          <h2>Политика конфиденциальности</h2>
          <p>Дата вступления в силу: {new Date().toLocaleDateString()}</p>
          
          <h3>1. Сбор информации</h3>
          <p>Мы собираем информацию, когда вы посещаете наш сайт, используете формы обратной связи или файлы cookie для анализа трафика.</p>
          
          <h3>2. Использование данных</h3>
          <p>Вся собранная информация используется для улучшения обслуживания клиентов, анализа работы сайта и связи с вами по вашим запросам.</p>
          
          <h3>3. Защита данных</h3>
          <p>Мы принимаем все необходимые меры безопасности для защиты ваших персональных данных от несанкционированного доступа.</p>
          
          <h3>4. Согласие с файлами Cookie</h3>
          <p>Используя наш сайт, вы соглашаетесь с использованием файлов cookie в соответствии с уведомлением, которое вы видели при входе.</p>
          
          <p style={{marginTop: '20px', fontSize: '0.8rem', color: '#888'}}>
            Это упрощенный образец политики. Для реального бизнеса рекомендуется консультация с юристом.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;
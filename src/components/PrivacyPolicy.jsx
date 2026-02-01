import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import './PrivacyPolicy.css';

const PrivacyPolicy = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="policy-overlay" onClick={onClose}>
      <motion.div 
        className="policy-modal"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="policy-close-modern" onClick={onClose} aria-label="Закрыть">
        <div className="close-line rotate-45"></div>
        <div className="close-line rotate-minus-45"></div>
        </button>
        
        <div className="policy-content">
          <h2>Пользовательское соглашение</h2>
          <p>Настоящее Соглашение является публичной офертой и определяет условия использования материалов и сервисов, размещенных на сайте <strong>mastermedaopt.ru</strong>.</p>

          <h3>1. Определение терминов</h3>
          <p>1.1. Сайт – совокупность информации по адресу <strong>mastermedaopt.ru</strong>.</p>
          <p>1.2. Администрация Сайта – уполномоченные сотрудники, управляющие Сайтом.</p>
          <p>1.3. Пользователь Сайта – любое лицо, использующее Сайт.</p>
          <p>1.4. Персональные данные – любая информация, относящаяся к определенному физическому лицу.</p>

          <h3>2. Общие условия</h3>
          <p>2.1. Использование Сайта означает согласие с настоящей Политикой конфиденциальности.</p>
          <p>2.2. В случае несогласия Пользователь обязан прекратить использование Сайта.</p>
          <p>2.3. Администрация не проверяет достоверность предоставленных данных.</p>

          <h3>3. Обязательства Пользователя</h3>
          <p>3.1. Пользователь соглашается не нарушать российское законодательство и нормы международного права.</p>
          <p>3.2. Цитирование материалов Сайта допускается только с активной ссылкой на <strong>mastermedaopt.ru</strong>.</p>

          <h3>4. Прочие условия</h3>
          <p>4.1. Все споры подлежат разрешению в соответствии с законодательством РФ.</p>
          <p>4.2. Администрация вправе в одностороннем порядке изменять условия настоящего Соглашения.</p>
          
          <p style={{marginTop: '30px', fontWeight: 'bold'}}>
            Переходя по ссылке mastermedaopt.ru, Пользователь подтверждает, что принимает условия настоящего Соглашения.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
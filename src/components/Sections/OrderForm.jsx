import './OrderForm.css';
import React, { useState } from 'react';
import { motion } from 'framer-motion';


const OrderForm = ({ onSuccess, onOpenLegal }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    volume: '',
    message: ''
  });
  const [isConsentAccepted, setIsConsentAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendTelegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', company: '', phone: '', volume: '', message: '' });
        setIsConsentAccepted(false);
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json();
        alert('Ошибка: ' + (errorData.error || 'Telegram API error'));
      }
    } catch (error) {
      alert('Ошибка соединения: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="order-form-vertical">
      <div className="form-fields-container">
        <input 
          type="text" name="name" placeholder="Имя" 
          value={formData.name} onChange={handleChange} required 
        />
        <input 
          type="text" name="company" placeholder="Компания" 
          value={formData.company} onChange={handleChange} 
        />
        <input 
          type="tel" name="phone" placeholder="Телефон" 
          value={formData.phone} onChange={handleChange} required 
        />
        <select name="volume" value={formData.volume} onChange={handleChange} required>
          <option value="" disabled>Планируемый объем</option>
          <option value="до 100 кг">до 100 кг</option>
          <option value="100-500 кг">100-500 кг</option>
          <option value="от 500 кг">от 500 кг</option>
          <option value="Контейнеры">Контейнеры/Опт</option>
        </select>
        <input 
          name="message" 
          placeholder="Комментарий (необязательно)" 
          value={formData.message} 
          onChange={handleChange}
          className="comment-input"
        />
        <label className="form-consent">
          <input
            type="checkbox"
            checked={isConsentAccepted}
            onChange={(e) => setIsConsentAccepted(e.target.checked)}
            required
          />
          <span>
            Я соглашаюсь с{' '}
            <button
              type="button"
              className="form-consent-link"
              onClick={() => onOpenLegal?.('privacy')}
            >
              Политикой конфиденциальности
            </button>{' '}
            и даю согласие на{' '}
            <button
              type="button"
              className="form-consent-link"
              onClick={() => onOpenLegal?.('personal-data')}
            >
              обработку персональных данных
            </button>
            .
          </span>
        </label>
        <motion.button 
          type="submit" 
          className="submit-btn-vertical"
          disabled={!isConsentAccepted}
        >
          Отправить заявку
        </motion.button>
      </div>
    </form>
  );
};

export default OrderForm;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './OrderForm.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    volume: '',
    message: ''
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  // ВСТАВЬТЕ СВОИ ДАННЫЕ СЮДА:
  const TELEGRAM_TOKEN = '8453278473:AAGKQwtVhQUq6SkVCQ3ZNHNUQ2wTEE_IcX0';
  const CHAT_ID = '1215645483';

  // Собираем текст сообщения
  const message = `
🍯 **Новая заявка с сайта!**
👤 **Имя:** ${formData.name}
🏢 **Компания:** ${formData.company || 'Не указана'}
📞 **Телефон:** ${formData.phone}
📦 **Объем:** ${formData.volume}
💬 **Комментарий:** ${formData.message || '-'}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown' // Чтобы текст был красивым (жирным)
      })
    });

    if (response.ok) {
      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      // Очищаем форму после успеха
      setFormData({ name: '', company: '', phone: '', volume: '', message: '' });
    } else {
      alert('Ошибка при отправке. Попробуйте написать нам в Telegram напрямую.');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка. Проверьте интернет-соединение.');
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="order-form-inline">
      <div className="form-main-row">
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
          <option value="" disabled>Объем</option>
          <option value="до 100 кг">до 100 кг</option>
          <option value="100-500 кг">100-500 кг</option>
          <option value="от 500 кг">от 500 кг</option>
          <option value="Контейнеры">Контейнеры</option>
        </select>
        <motion.button 
          type="submit" 
          className="submit-btn-inline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Отправить
        </motion.button>
      </div>
      
      {/* Поле комментария сделаем аккуратной строкой ниже */}
      <div className="form-bottom-row">
        <input 
          name="message" 
          placeholder="Добавить комментарий (необязательно)..." 
          value={formData.message} 
          onChange={handleChange}
          className="comment-input"
        />
      </div>
    </form>
  );
};

export default OrderForm;
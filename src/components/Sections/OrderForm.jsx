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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные для отправки:', formData);
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
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
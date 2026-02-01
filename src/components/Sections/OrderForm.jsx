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
    // Пока что просто выводим в консоль, "мозг" прикрутим позже
    console.log('Данные для отправки:', formData);
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="order-form-container">
      <motion.div 
        className="order-form-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>Оставить заявку на опт</h3>
        <p>Заполните форму, и мы вышлем вам актуальный прайс-лист с индивидуальными условиями.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" name="name" placeholder="Ваше имя" 
              value={formData.name} onChange={handleChange} required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" name="company" placeholder="Название компании" 
              value={formData.company} onChange={handleChange} 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <input 
                type="tel" name="phone" placeholder="Телефон" 
                value={formData.phone} onChange={handleChange} required 
              />
            </div>
            <div className="form-group">
              <select name="volume" value={formData.volume} onChange={handleChange} required>
                <option value="" disabled>Объем (в месяц)</option>
                <option value="до 100 кг">до 100 кг</option>
                <option value="100-500 кг">100-500 кг</option>
                <option value="от 500 кг">от 500 кг</option>
                <option value="Контейнерные перевозки">Контейнеры (экспорт)</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <textarea 
              name="message" placeholder="Ваш комментарий или вопрос" 
              rows="4" value={formData.message} onChange={handleChange}
            ></textarea>
          </div>
          <motion.button 
            type="submit" 
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Получить условия
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default OrderForm;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Products.css';

const productsData = [
  // ВЕСОВОЙ МЕД
  {
    id: 1,
    category: 'weight',
    name: 'Мёд цветочный весовой',
    packaging: 'Пластиковое ведро',
    weight: '7.5 кг',
    price: '240.00 р/кг',
    note: 'Цена с НДС. Идеально для производств и пекарен.',
    badge: 'Для производств'
  },
  // НАТУРАЛЬНЫЙ МЕД (СТЕКЛО)
  {
    id: 2,
    category: 'classic',
    name: 'Мёд "Липовый цвет"',
    packaging: 'Стеклянная банка',
    weight: '240г / 330г',
    price: 'от 148.05 р',
    inBox: '12 шт. в кор.',
    badge: 'ГОСТ'
  },
  {
    id: 3,
    category: 'classic',
    name: 'Мёд "Гречишный цвет"',
    packaging: 'Стеклянная банка',
    weight: '240г / 330г',
    price: 'от 148.05 р',
    inBox: '12 шт. в кор.'
  },
  // С ДОБАВКАМИ
  {
    id: 4,
    category: 'with-additives',
    name: 'Мёд с малиной / лимоном / имбирем',
    packaging: 'Стекло / Пластик',
    weight: '240г / 280г / 350г',
    price: 'от 127.83 р',
    inBox: '12 шт. в кор.',
    badge: 'Хит продаж'
  },
  // ПОДАРОЧНЫЕ НАБОРЫ
  {
    id: 5,
    category: 'gifts',
    name: 'Набор мёда с добавками',
    packaging: 'Подарочный бокс (картон)',
    weight: '720г (3 банки по 240г)',
    price: '418.46 р',
    note: 'Готовое решение для подарка к праздникам.',
    badge: 'Подарок'
  }
];

const Products = () => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === filter);

  return (
    <section className="products-section" id="products">
      <div className="products-header">
        <motion.span className="subtitle">Ассортимент Мастер Мёда</motion.span>
        <h2>Наша продукция</h2>
        <p className="description">
          Более 30 видов мёда собственного производства в Санкт-Петербурге. 
          Контроль качества на каждом этапе.
        </p>

        {/* Фильтры */}
        <div className="filter-bar">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Все</button>
          <button className={filter === 'classic' ? 'active' : ''} onClick={() => setFilter('classic')}>Натуральный мед</button>
          <button className={filter === 'weight' ? 'active' : ''} onClick={() => setFilter('weight')}>Весовой (Опт)</button>
          <button className={filter === 'with-additives' ? 'active' : ''} onClick={() => setFilter('with-additives')}>С добавками</button>
          <button className={filter === 'gifts' ? 'active' : ''} onClick={() => setFilter('gifts')}>Подарки</button>
        </div>
      </div>

              {/* Обновленный фрагмент внутри Products.jsx */}
        <div className="products-grid-container"> 
          <AnimatePresence mode="wait" initial={false}> 
            <motion.div 
              key={filter} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="products-grid"
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  {/* ... внутренности карточки без изменений ... */}
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <div className="product-image-placeholder">
                    <span>{product.name}</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-meta">
                      <span><strong>Тара:</strong> {product.packaging}</span>
                      <span><strong>Вес:</strong> {product.weight}</span>
                      {product.inBox && <span><strong>В коробке:</strong> {product.inBox}</span>}
                    </div>
                    <div className="product-footer">
                      <span className="price">{product.price}</span>
                      <button className="order-btn">Запросить прайс</button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      <div className="catalog-download">
        <p>Нужен полный список из 30+ позиций?</p>
        <button className="download-btn">Скачать полный каталог (PDF)</button>
      </div>
    </section>
  );
};

export default Products;
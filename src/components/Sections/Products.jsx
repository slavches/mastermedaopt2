import React from 'react';
import { motion } from 'framer-motion';

// Убедись, что эти файлы ЕСТЬ в папке src/assets/images/
import akacievyyImg from '../../assets/images/akacievyy.jpg';
import grechishniyImg from '../../assets/images/grechishniy.jpg';
import koriandrovyiImg from '../../assets/images/koriandrovyi.jpg';
import podsolnechnikovyyImg from '../../assets/images/podsolnechnikovyy.jpg';

function Products({ onProductSelect, selectedProduct }) {
  const products = [
    { id: 'acacia', name: 'Акациевый мёд', image: akacievyyImg },
    { id: 'buckwheat', name: 'Гречишный мёд', image: grechishniyImg },
    { id: 'coriander', name: 'Кориандровый мёд', image: koriandrovyiImg },
    { id: 'sunflower', name: 'Подсолнечниковый мёд', image: podsolnechnikovyyImg }
  ];

  return (
    <section id="products" className="section">
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => onProductSelect(product.id)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
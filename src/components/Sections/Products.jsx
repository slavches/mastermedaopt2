import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const productsData = [
  {
    id: 1,
    title: "Мёд с имбирём",
    price: "380 ₽/кг",
    images: [
      "/images/imbir2401.webp",
      "/images/imbir2402.webp",
      "/images/imbir2403.webp",
      "/images/imbir2404.webp",
      "/images/imbir2405.webp"
    ],
    description: "Натуральный мёд высшего качества с натуральным имбирём, сбор 2025 года."
  },
  {
    id: 2,
    title: "Мёд Гречишный Алтайский",
    price: "320 ₽/кг",
    images: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500"],
    description: "Насыщенный темный мёд с полей Алтая."
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="products" className="section">
      <h2 className="section-title">Каталог продукции</h2>
      
      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            {/* СЛАЙДЕР В КАРТОЧКЕ (Работает свайп и точки) */}
            <div className="card-image-wrapper">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="card-slider"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index} onClick={() => openModal(product)}>
                    <img src={img} alt={product.title} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="product-card-body" onClick={() => openModal(product)}>
              <div className="product-card-price">{product.price}</div>
              <h3 className="product-card-title">{product.title}</h3>
              <button className="submit-btn-inline" style={{width: '100%'}}>Подробнее</button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>✕</button>
            
            <div className="modal-body">
              <div className="modal-gallery-container">
                {/* СЛАЙДЕР В МОДАЛКЕ (Свайп + Стрелки + Дроби) */}
                <Swiper 
                  modules={[Navigation, Pagination]} 
                  navigation={true} 
                  pagination={{ type: 'fraction' }}
                  className="modal-swiper-main"
                >
                  {selectedProduct.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="modal-slide-img-wrapper">
                        <img src={img} alt="продукт" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="modal-text-content">
                <h2>{selectedProduct.title}</h2>
                <div className="modal-price-tag">{selectedProduct.price}</div>
                <div className="modal-divider-line"></div>
                <p className="modal-desc">{selectedProduct.description}</p>
                <button className="submit-btn-inline" style={{marginTop: 'auto'}} onClick={closeModal}>
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
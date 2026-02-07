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
    price: "380 ₽/240гр",
    images: [
      "/images/imbir240/imbir2401.webp",
      "/images/imbir240/imbir2402.webp",
      "/images/imbir240/imbir2403.webp",
      "/images/imbir240/imbir2404.webp",
      "/images/imbir240/imbir2405.webp"
    ],
    description: "Натуральный мёд высшего качества с натуральным имбирём, сбор 2025 года."
  },
  {
    id: 2,
    title: "Подарочный набор мёда 3 баночки по 240 грамм",
    price: "720 ₽/шт",
    images: [
      "/images/3x240happy/3х240happy1.webp",
      "/images/3x240happy/3х240happy2.webp",
      "/images/3x240happy/3х240happy3.webp",
      "/images/3x240happy/3х240happy4.webp",
      "/images/3x240happy/3х240happy5.webp"],
    description: "Вкусный набор с тремя вкусами."
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
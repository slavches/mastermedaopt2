import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/pagination';

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
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500"
    ],
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
          <div key={product.id} className="product-card" onClick={() => openModal(product)}>
            {/* ВАЖНО: modules={[Pagination]} должен быть здесь */}
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="card-slider"
              onClick={(e) => e.stopPropagation()}
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img 
                    src={img} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="product-card-body">
              <div className="product-card-price">{product.price}</div>
              <h3 className="product-card-title">{product.title}</h3>
              <button className="submit-btn-inline" style={{width: '100%'}}>Подробнее</button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>✕</button>
            <div className="modal-grid">
              <div className="modal-gallery">
                {/* ВАЖНО: modules={[Pagination]} и здесь тоже */}
                <Swiper 
                  modules={[Pagination]} 
                  pagination={{ type: 'fraction' }}
                  style={{ width: '100%' }}
                >
                  {selectedProduct.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img 
                        src={img} 
                        alt="full" 
                        style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }} 
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="modal-info">
                <h2>{selectedProduct.title}</h2>
                <p className="product-card-price">{selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
                <button className="submit-btn-inline" onClick={closeModal}>Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
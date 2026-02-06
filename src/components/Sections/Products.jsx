import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const productsData = [
  {
    id: 1,
    title: "Мёд Липовый Дальневосточный, Сбор 2025 года",
    price: "380 ₽/кг",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80", 
      "https://images.unsplash.com/photo-1471943311424-646960669fba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558583055-d7ac00b1adca?auto=format&fit=crop&w=800&q=80"
    ],
    fullDescription: "Натуральный липовый мёд высшего качества. Собран в экологически чистых районах Дальнего Востока в июле 2025 года. Обладает нежным ароматом и целебными свойствами. Идеально подходит для фасовки и промышленного использования. Соответствует ГОСТ 31761-2012."
  },
  {
    id: 2,
    title: "Мёд Гречишный, Алтайский край",
    price: "320 ₽/кг",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558583082-409143c794ca?auto=format&fit=crop&w=800&q=80"
    ],
    fullDescription: "Насыщенный темный мёд с характерной горчинкой. Богат железом и микроэлементами. Собран на полях Алтая."
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="products" className="section">
      <div className="section-content">
        <h2 className="section-title">Наш мёд</h2>
        
        <div className="products-grid">
          {productsData.map((product) => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <div className="infographic-label">ГОСТ 31761-2012</div>
              
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="card-slider"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={product.title} loading="lazy" />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="product-card-body">
                <div className="product-card-price">{product.price}</div>
                <div className="product-card-title">{product.title}</div>
                <button className="order-button">Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно (Поп-ап) */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>×</button>
            
            <div className="modal-grid">
              <div className="modal-gallery">
                 <Swiper 
                    modules={[Pagination]} 
                    pagination={{ type: 'fraction' }}
                    className="modal-main-slider"
                 >
                    {selectedProduct.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img src={img} alt="Вид товара" />
                      </SwiperSlide>
                    ))}
                 </Swiper>
              </div>

              <div className="modal-info">
                <h2>{selectedProduct.title}</h2>
                <div className="modal-price">{selectedProduct.price}</div>
                <div className="modal-desc-text">
                  <p>{selectedProduct.fullDescription}</p>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn-primary" 
                    onClick={() => {
                        setSelectedProduct(null);
                        window.location.href = '#home'; // Прокрутка к форме
                    }}
                  >
                    Заказать партию
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
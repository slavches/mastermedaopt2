import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules'; // Добавили Thumbs и FreeMode

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs'; // Важно импортировать стили для миниатюр
import 'swiper/css/free-mode';


const productsData = [
  {
    id: 1,
    category: "Новинка",
    title: "Мёд с имбирём",
    price: "380 ₽",
    weight: "240 гр", // Разделили цену и вес для красоты
    images: [
      "/images/imbir240/imbir2401.webp",
      "/images/imbir240/imbir2402.webp",
      "/images/imbir240/imbir2403.webp",
      "/images/imbir240/imbir2404.webp",
      "/images/imbir240/imbir2405.webp"
    ],
    description: "Натуральный цветочный мёд с добавлением тертого корня имбиря. Идеальное сочетание пользы и пряного вкуса для вашего иммунитета."  },
  {
    id: 2,
    category: "Новинка",
    title: "Подарочный набор мёда 3 баночки по 240 грамм",
    price: "720 ₽",
    weight: "1 коробка", // Разделили цену и вес для красоты
    images: [
      "/images/3x240happy/3х240happy1.webp",
      "/images/3x240happy/3х240happy2.webp",
      "/images/3x240happy/3х240happy3.webp",
      "/images/3x240happy/3х240happy4.webp",
      "/images/3x240happy/3х240happy5.webp"
    ],
    description: "Вкусный набор с тремя вкусами."
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // Состояние для связи слайдеров

  const openModal = (product) => {
    setSelectedProduct(product);
    setThumbsSwiper(null); // Сбрасываем при открытии нового товара
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="products" className="section">
      <h2 className="section-title">Наша пасека</h2>
      <p className="section-subtitle">Попробуйте натуральный мёд, собранный с любовью</p>
      
      <div className="products-grid">
        {productsData.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            // Включаем автоплей при наведении
            onMouseEnter={(e) => {
              const swiper = e.currentTarget.querySelector('.swiper').swiper;
              swiper.autoplay.start();
            }}
            // Выключаем и сбрасываем на первое фото, когда уводим мышку
            onMouseLeave={(e) => {
              const swiper = e.currentTarget.querySelector('.swiper').swiper;
              swiper.autoplay.stop();
              swiper.slideTo(0); 
            }}
          >
            <div className="card-image-wrapper">
              <div className="card-badge">{product.category}</div>
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                autoHeight={false} // Добавьте это: запрещает слайдеру менять высоту под картинку
                onSwiper={(swiper) => swiper.autoplay.stop()}
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
              <div className="product-card-meta">
                <span className="product-card-price">{product.price}</span>
                <span className="product-card-weight">{product.weight}</span>
              </div>
              <h3 className="product-card-title">{product.title}</h3>
              <button className="details-btn">Узнать больше</button>
            </div>
          </div>
        ))}
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>✕</button>
            
            <div className="modal-body">
              <div className="modal-gallery-container">
                
                {/* ГЛАВНЫЙ СЛАЙДЕР В МОДАЛКЕ */}
                <Swiper 
                  style={{
                    '--swiper-navigation-color': '#D2691E',
                    '--swiper-pagination-color': '#D2691E',
                  }}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[FreeMode, Navigation, Thumbs]}
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

                {/* НИЖНИЙ СЛАЙДЕР С МИНИАТЮРАМИ */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="thumbs-slider"
                >
                  {selectedProduct.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="thumb-wrapper">
                        <img src={img} alt="миниатюра" />
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
                <button className="details-btn" style={{marginTop: 'auto'}} onClick={closeModal}>
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
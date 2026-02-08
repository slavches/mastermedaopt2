import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const productsData = [
  {
    id: 1,
    category: "Новинка",
    title: "Мёд с имбирём",
    price: "380 ₽",
    weight: "240 гр",
    images: [
      "/images/imbir240/imbir2401.webp",
      "/images/imbir240/imbir2402.webp",
      "/images/imbir240/imbir2403.webp",
      "/images/imbir240/imbir2404.webp",
      "/images/imbir240/imbir2405.webp"
    ],
    description: "Натуральный цветочный мёд с добавлением тертого корня имбиря. Идеальное сочетание пользы и пряного вкуса для вашего иммунитета."
  },
  {
    id: 2,
    category: "Новинка",
    title: "Подарочный набор мёда 3 баночки по 240 грамм",
    price: "720 ₽",
    weight: "1 коробка",
    images: [
      "/images/3x240happy/3х240happy1.webp",
      "/images/3x240happy/3х240happy2.webp",
      "/images/3x240happy/3х240happy3.webp",
      "/images/3x240happy/3х240happy4.webp",
      "/images/3x240happy/3х240happy5.webp"
    ],
    description: "Вкусный набор с тремя вкусами."
  },
  {
    id: 3,
    category: "Новинка",
    title: "Подарочный набор мёда 2 баночки по 330 грамм",
    price: "720 ₽",
    weight: "1 коробка",
    images: [
      "/images/2х330nabor/2х330nabor1.webp",
      "/images/2х330nabor/2х330nabor2.webp",
      "/images/2х330nabor/2х330nabor3.webp"
    ],
    description: "Вкусный набор с двумя вкусами."
  },
  {
    id: 4,
    category: "Новинка",
    title: "Разнотравие 500 грамм",
    price: "600 ₽",
    weight: "1 баночка",
    images: [
      "/images/raznotravie500/raznotravie5001.webp",
      "/images/raznotravie500/raznotravie5002.webp",
      "/images/raznotravie500/raznotravie5003.webp",
      "/images/raznotravie500/raznotravie5004.webp",
      "/images/raznotravie500/raznotravie5005.webp"
    ],
    description: "Вкусный набор с двумя вкусами."
  },
  {
    id: 5,
    category: "Новинка",
    title: "Липовый 330 грамм",
    price: "700 ₽",
    weight: "1 баночка",
    images: [
      "/images/lipovii330/lipovii3301.webp",
      "/images/lipovii330/lipovii3302.webp"
    ],
    description: "Вкусный липовый мёд."
  },
  {
    id: 6,
    category: "Новинка",
    title: "Разноцветье 330 грамм",
    price: "700 ₽",
    weight: "1 баночка",
    images: [
      "/images/raznocvetie330/raznocvetie3301.webp",
      "/images/raznocvetie330/raznocvetie3302.webp",
      "/images/raznocvetie330/raznocvetie3303.webp",
      "/images/raznocvetie330/raznocvetie3304.webp"      
    ],
    description: "Вкусный мёд в маленькой баночке."
  },
  {
    id: 7,
    category: "Новинка",
    title: "7.5 кг",
    price: "5000 ₽",
    weight: "1 баночка",
    images: [
      "/images/75kg/cvetochnii75.webp"    
    ],
    description: "Удобная баночка для кондитерских."
  },
  {
    id: 8,
    category: "Новинка",
    title: "33.5 кг",
    price: "9000 ₽",
    weight: "1 кубик",
    images: [
      "/images/335kg/cvetochnii335.webp"    
    ],
    description: "Большой куботейнер для кондитерских."
  },
  {
    id: 9,
    category: "Новинка",
    title: "400 г",
    price: "700 ₽",
    weight: "1 баночка",
    images: [
      "/images/bashmed400/bashmed4001.webp",   
      "/images/bashmed400/bashmed4002.webp",  
      "/images/bashmed400/bashmed4003.webp",  
      "/images/bashmed400/bashmed4004.webp",  
      "/images/bashmed400/bashmed4005.webp" 
    ],
    description: "Популярный башкирский мёд в компактной баночке."
  }
  
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setThumbsSwiper(null);
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
            onMouseEnter={(e) => {
              const swiper = e.currentTarget.querySelector('.swiper')?.swiper;
              if (swiper) swiper.autoplay.start();
            }}
            onMouseLeave={(e) => {
              const swiper = e.currentTarget.querySelector('.swiper')?.swiper;
              if (swiper) {
                swiper.autoplay.stop();
                swiper.slideTo(0);
              }
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
                autoHeight={false}
                onSwiper={(swiper) => swiper.autoplay.stop()}
                className="card-slider"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index} onClick={() => openModal(product)}>
                    <img 
                    src={img} 
                    alt={product.title} 
                    style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    width: 'auto', 
                    height: 'auto', 
                    objectFit: 'contain' 
                    }} 
                  />
                  </SwiperSlide>
                ))}
              </Swiper>
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
                        <img src={img} alt="продукт" style={{ objectFit: 'contain' }} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

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
                        <img src={img} alt="миниатюра" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
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
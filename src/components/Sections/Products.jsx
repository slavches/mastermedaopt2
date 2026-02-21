import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import './Products.css';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const productsData = [
  // ... твои данные (имбирь, наборы, башкирский мед и т.д.) без изменений
  {
    id: 1,
    category: "Новинка",
    title: "Мёд с имбирём",
    price: "380 ₽",
    weight: "240 гр",
    images: ["/images/imbir240/imbir2401.webp", "/images/imbir240/imbir2402.webp"],
    description: "Натуральный цветочный мёд с добавлением тертого корня имбиря."
  },
  // Остальные объекты данных...
  {
    id: 9,
    category: "Новинка",
    title: "Башкирский мёд 400 г",
    price: "700 ₽",
    weight: "1 баночка",
    images: ["/images/bashmed400/bashmed4001.webp"],
    description: "Слава о нем ходит по всему миру..."
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const openModal = (product) => {
    const scrollY = window.scrollY;
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    setSelectedProduct(product);
  };

  const handleClose = () => {
    const scrollY = document.body.style.top;
    const scrollPosition = parseInt(scrollY || '0') * -1;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
    setTimeout(() => {
      setSelectedProduct(null);
      setThumbsSwiper(null);
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    }, 10);
  };

  return (
    <section id="products" className="section">
      <div className="section-header">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Наша продукция
        </motion.h2>
        <div className="title-divider"></div>
        <p className="section-subtitle">Попробуйте натуральный мёд, собранный с любовью</p>
      </div>
      
      <div className="products-grid">
        {productsData.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => openModal(product)}
          >
            <div className="card-image-wrapper">
              <div className="card-badge">{product.category}</div>
              <Swiper
                modules={[Pagination, Autoplay]}
                speed={400}
                pagination={{ clickable: true }}
                autoplay={{ delay: 1200, disableOnInteraction: false }}
                onSwiper={(swiper) => swiper.autoplay.stop()}
                onMouseEnter={(e) => {
                  const sw = e.currentTarget.querySelector('.swiper')?.swiper;
                  if (sw) sw.autoplay.start();
                }}
                onMouseLeave={(e) => {
                  const sw = e.currentTarget.querySelector('.swiper')?.swiper;
                  if (sw) { sw.autoplay.stop(); sw.slideTo(0); }
                }}
                className="card-slider"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={product.title} loading="lazy" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="product-card-body">
              <div className="product-card-meta">
                <span className="product-card-price">{product.price}</span>
                <span className="product-card-weight">{product.weight}</span>
              </div>
              <h3 className="product-card-title">{product.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleClose}>✕</button>
            <div className="modal-body">
              
              <div className="modal-gallery-container">
                <Swiper 
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="modal-swiper-main"
                >
                  {selectedProduct.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="modal-slide-img-wrapper">
                        <img src={img} alt={selectedProduct.title} />
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
                        <img src={img} alt="мини" />
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
                
                <a 
                  href="https://t.me/your_bot" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-telegram-wide"
                >
                  <span>Заказать в Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
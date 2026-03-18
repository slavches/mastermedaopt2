import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import './Products.css';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

// 1. Дополненный массив (твои 9 + мои 11)
const productsData = [
  {
    id: 1,
    filterCategory: "cream",
    category: "Крем-мёд",
    title: "Мёд с имбирём",
    price: "380 ₽",
    weight: "240 гр.",
    images: [
      "/images/imbir240/imbir2401.webp",
      "/images/imbir240/imbir2402.webp",
      "/images/imbir240/imbir2403.webp",
      "/images/imbir240/imbir2404.webp",
      "/images/imbir240/imbir2405.webp"
    ],
    description: "Натуральный цветочный мёд с имбирем."
  },
  {
    id: 2,
    filterCategory: "gift",
    category: "Набор",
    title: "Подарочный набор 3 баночки",
    price: "720 ₽",
    weight: "3 баночки по 240 гр.",
    images: [
      "/images/3x240happy/3х240happy1.webp",
      "/images/3x240happy/3х240happy2.webp",
      "/images/3x240happy/3х240happy3.webp",
      "/images/3x240happy/3х240happy4.webp",
      "/images/3x240happy/3х240happy5.webp"
    ],
    description: "Вкусный набор."
  },
  {
    id: 3,
    filterCategory: "gift",
    category: "Набор",
    title: "Подарочный набор 2 баночки",
    price: "720 ₽",
    weight: "2 баночки по 330 гр.",
    images: [
      "/images/2х330nabor/2х330nabor1.webp",
      "/images/2х330nabor/2х330nabor2.webp",
      "/images/2х330nabor/2х330nabor3.webp"
    ],
    description: "Вкусный набор."
  },
  {
    id: 4,
    filterCategory: "classic",
    category: "Мёд",
    title: "Разнотравие",
    price: "600 ₽",
    weight: "500 грамм",
    images: [
      "/images/raznotravie500/raznotravie5001.webp",
      "/images/raznotravie500/raznotravie5002.webp",
      "/images/raznotravie500/raznotravie5003.webp",
      "/images/raznotravie500/raznotravie5004.webp",
      "/images/raznotravie500/raznotravie5005.webp"
    ],
    description: "Натуральное разнотравье."
  },
  {
    id: 5,
    filterCategory: "classic",
    category: "Мёд",
    title: "Липовый",
    price: "700 ₽",
    weight: "330 грамм",
    images: [
      "/images/lipovii330/lipovii3301.webp",
      "/images/lipovii330/lipovii3302.webp"
    ],
    description: "Вкусный липовый мёд."
  },
  {
    id: 6,
    filterCategory: "classic",
    category: "Мёд",
    title: "Разноцветье",
    price: "700 ₽",
    weight: "330 грамм",
    images: [
      "/images/raznocvetie330/raznocvetie3301.webp",
      "/images/raznocvetie330/raznocvetie3302.webp",
      "/images/raznocvetie330/raznocvetie3303.webp",
      "/images/raznocvetie330/raznocvetie3304.webp"
    ],
    description: "Мёд в маленькой баночке."
  },
  {
    id: 7,
    filterCategory: "bulk",
    category: "Опт",
    title: "Цветочный (ведро)",
    price: "5000 ₽",
    weight: "7.5 кг",
    images: [
      "/images/cvetochnii75/cvetochnii751.webp",
      "/images/cvetochnii75/cvetochnii752.webp"
    ],
    description: "Для кондитеров"
  },
  {
    id: 8,
    filterCategory: "bulk",
    category: "Опт",
    title: "Цветочный (куб)",
    price: "9000 ₽",
    weight: "33.5 кг",
    images: [
      "/images/cvetochnii335/cvetochnii335.webp"
    ],
    description: "Для производств"
  },
  {
    id: 9,
    filterCategory: "premium",
    category: "Башкирский мёд",
    title: "Башкирский мёд",
    price: "700 ₽",
    weight: "400 г",
    images: [
      "/images/bashmed400/bashmed4001.webp",
      "/images/bashmed400/bashmed4002.webp",
      "/images/bashmed400/bashmed4003.webp",
      "/images/bashmed400/bashmed4004.webp",
      "/images/bashmed400/bashmed4005.webp"
    ],
    description: "Знаменитый башкирский мёд"
  },
  {
    id: 10,
    filterCategory: "classic",
    category: "Мёд",
    title: "Гречишный мёд",
    price: "650 ₽",
    weight: "240г.-1кг.",
    images: [
      "/images/grechishnii/grechishnii1.webp",
      "/images/grechishnii/grechishnii2.webp",
      "/images/grechishnii/grechishnii3.webp",
      "/images/grechishnii/grechishnii4.webp",
      "/images/grechishnii/grechishnii5.webp",
      "/images/grechishnii/grechishnii6.webp"
    ],
    description: "Насыщенный вкус"
  },
  {
    id: 11,
    filterCategory: "cream",
    category: "Крем-мёд",
    title: "Мёд с малиной",
    price: "450 ₽",
    weight: "240 гр",
    images: [
      "/images/malina240/malina240.webp"
    ],
    description: "Нежный десерт"
  },
  {
    id: 12,
    filterCategory: "bulk",
    category: "Опт",
    title: "Гречишный (куб)",
    price: "10000 ₽",
    weight: "33.5 кг",
    images: [
      "/images/grechishnii335/grechishnii335.webp"
    ],
    description: "Насыщенный вкус"
  },
  {
    id: 13,
    filterCategory: "bulk",
    category: "Опт",
    title: "Подсолнечниковый (куб)",
    price: "8000 ₽",
    weight: "33.5 кг",
    images: [
      "/images/podsolnyh335/podsolnyh335.webp"
    ],
    description: "Тонкий аромат"
  },
  {
    id: 14,
    filterCategory: "Докторъ Мёд",
    category: "Премиум",
    title: "Гречишный мёд",
    price: "550 ₽",
    weight: "330 гр.",
    images: [
      "/images/grechishnii330/grechishnii3301.webp",
      "/images/grechishnii330/grechishnii3302.webp",
      "/images/grechishnii330/grechishnii3303.webp"
    ],
    description: "VIP подарок"
  },
  {
    id: 15,
    filterCategory: "Докторъ Мёд",
    category: "Премиум",
    title: "Донниковый мёд",
    price: "550 ₽",
    weight: "330 гр.",
    images: [
      "/images/donnikovii/donnikovii1.webp",
      "/images/donnikovii/donnikovii2.webp",
      "/images/donnikovii/donnikovii3.webp"
    ],
    description: "Мягкий ванильный вкус"
  },
  {
    id: 16,
    filterCategory: "premium",
    category: "Горный",
    title: "Алтайское высокогорье",
    price: "950 ₽",
    weight: "500 гр",
    images: [
      "/images/placeholder.webp"
    ],
    description: "С чистых гор"
  },
  {
    id: 17,
    filterCategory: "cream",
    category: "Крем-мёд",
    title: "Мёд с кедровым орехом",
    price: "580 ₽",
    weight: "250 гр",
    images: [
      "/images/placeholder.webp"
    ],
    description: "Сибирское здоровье"
  },
  {
    id: 18,
    filterCategory: "gift",
    category: "Набор",
    title: "Медовое ассорти Mini",
    price: "550 ₽",
    weight: "3 баночки",
    images: [
      "/images/placeholder.webp"
    ],
    description: "Пробный набор."
  },
  {
    id: 19,
    filterCategory: "bulk",
    category: "Опт",
    title: "Липовый мёд (куб)",
    price: "15000 ₽",
    weight: "33.5 кг",
    images: [
      "/images/lipovii335/lipovii335.webp"
    ],
    description: "Оптовая поставка."
  },
  {
    id: 20,
    filterCategory: "classic",
    category: "Мёд",
    title: "Подсолнечный мёд",
    price: "400 ₽",
    weight: "1 кг",
    images: [
      "/images/placeholder.webp"
    ],
    description: "Яркое послевкусие."
  },
  {
    id: 21,
    filterCategory: "Magicbee",
    category: "Премиум",
    title: "Донские степи",
    price: "500 ₽",
    weight: "240г.-1кг.",
    images: [
      "/images/donskie/donskie1.webp",
      "/images/donskie/donskie2.webp",
      "/images/donskie/donskie3.webp",
      "/images/donskie/donskie4.webp"
    ],
    description: "Яркое послевкусие."
  },
  {
    id: 22,
    filterCategory: "Magicbee",
    category: "Премиум",
    title: "Адыгейский майский мёд",
    price: "400 ₽",
    weight: "240г.-1 кг.",
    images: [
      "/images/maiskii/maiskii1.webp",
      "/images/maiskii/maiskii2.webp"
    ],
    description: "Яркое послевкусие."
  },
  {
    id: 23,
    filterCategory: "Magicbee",
    category: "Премиум",
    title: "Поволжские травы",
    price: "400 ₽",
    weight: "240г.-1 кг.",
    images: [
      "/images/povolszskie/povolszskie1.webp",
      "/images/povolszskie/povolszskie2.webp",
      "/images/povolszskie/povolszskie3.webp",
      "/images/povolszskie/povolszskie4.webp"
    ],
    description: "Яркое послевкусие."
  },
  {
    id: 24,
    filterCategory: "Magicbee",
    category: "Премиум",
    title: "Псковский лесной мёд",
    price: "400 ₽",
    weight: "240г.-1 кг.",
    images: [
      "/images/pskovskii/pskovskii1.webp",
      "/images/pskovskii/pskovskii2.webp",
      "/images/pskovskii/pskovskii3.webp",
      "/images/pskovskii/pskovskii4.webp"
    ],
    description: "Яркое послевкусие."
  },
  {
    id: 25,
    filterCategory: "Magicbee",
    category: "Премиум",
    title: "Амурский таёжный мёд",
    price: "400 ₽",
    weight: "240г.-1 кг.",
    images: [
      "/images/taezhnii/taezhnii1.webp",
      "/images/taezhnii/taezhnii2.webp"
    ],
    description: "Яркое послевкусие."
  },
  {
    id: 26,
    filterCategory: "Magicbee",
    category: "Премиум",
    title: "Южный цветочный мёд",
    price: "400 ₽",
    weight: "1 кг",
    images: [
      "/images/yuzhnii/yuzhnii1.webp",
      "/images/yuzhnii/yuzhnii2.webp"
    ],
    description: "Яркое послевкусие."
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filterButtons = [
    { id: 'all', label: 'Все' },
    { id: 'classic', label: 'Классика' },
    { id: 'cream', label: 'С добавками' },
    { id: 'gift', label: 'Наборы' },
    { id: 'bulk', label: 'Опт (тара)' },
    { id: 'premium', label: 'Башкирский мёд' },
    { id: 'Magicbee', label: 'Magic Bee Регионы России' },
    { id: 'Докторъ Мёд', label: 'Докторъ Мёд' }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? productsData 
    : productsData.filter(p => p.filterCategory === activeFilter);

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
      
      <div className="filter-container">
        {filterButtons.map(btn => (
          <button
            key={btn.id}
            onClick={() => setActiveFilter(btn.id)}
            className={`filter-btn ${activeFilter === btn.id ? 'active' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

{/* СЕТКА ТОВАРОВ */}
      <div className="products-grid-container"> {/* Обертка для стабильности */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeFilter} // Ключ на контейнере, чтобы анимировать всю сетку целиком
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="products-grid"
          >
            {filteredProducts.map((product) => (
              <div 
  key={product.id}
  className="product-card"
  onClick={() => openModal(product)}
>
  {/* Перенесли события сюда для лучшего отклика */}
  <div 
    className="card-image-wrapper"
    onMouseEnter={(e) => {
      const swiperEl = e.currentTarget.querySelector('.swiper');
      if (swiperEl && swiperEl.swiper) swiperEl.swiper.autoplay.start();
    }}
    onMouseLeave={(e) => {
      const swiperEl = e.currentTarget.querySelector('.swiper');
      if (swiperEl && swiperEl.swiper) { 
        swiperEl.swiper.autoplay.stop(); 
        swiperEl.swiper.slideTo(0); 
      }
    }}
  >
    <div className="card-badge">{product.category}</div>
    <Swiper
      modules={[Pagination, Autoplay]}
      speed={400}
      pagination={{ clickable: true }}
      autoplay={{ 
        delay: 1000, 
        disableOnInteraction: false 
      }}
      slidesPerView={1}
      spaceBetween={0}
      watchSlidesProgress={true}
      style={{ width: '100%', height: '100%' }}
      onSwiper={(swiper) => swiper.autoplay.stop()}
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
          </motion.div>
        </AnimatePresence>
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
                  href={`https://t.me/your_bot?text=Здравствуйте! Хочу заказать: ${selectedProduct.title}`} 
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
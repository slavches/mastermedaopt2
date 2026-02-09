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
    description: "Слава о нем ходит по всему миру. Он является излюбленным лакомством ценителей мёда. Целительные свойства мёда много веков используются людьми для сохранения и поддержания здоровья. Ценность и неповторимость башкирского мёда обусловлены уникальностью природы Башкортостана.Такое многообразие цветущих медоносных растений (около 400 видов), которые являются ценнейшими лекарственными растениями, вряд ли встретишь ещё в каком-нибудь уголке России. Более трети территории Башкортостана покрыто лесами, сосредотачивающими самые обширные в стране площади медоносной растительности. Башкирский мёд своей славой обязан липе, она является основным медоносом республики. Липовый башкирский мёд прозрачен, светло-янтарного цвета с легким зеленоватым оттенком.Он обладает антибактериальными свойствами, содержит противомикробные вещества. Прекрасное профилактическое и лечебное средство против простудных и легочных заболеваний. Рекомендуется при воспалении желудочно-кишечного тракта, сердечных, почечных болезнях. Оказывает хорошее местное действие при лечении ран и ожогов. Не менее ценен и хорош башкирский сборно-цветочный мёд (лесной, луговой, горный), собранный не с одного, а с многих медоносов. Его используют как диетический продукт при желудочно-кишечных заболеваниях, для улучшения кровообращения и укрепления капиллярных сосудов. Он вобрал в себя силу десятков лекарственных растений, их нектар, пыльцу.Башкирский мёд в разные годы получал высокие награды выставок, ярмарок, конкурсов, как российских, так и международных, в том числе медали выставок конгрессов Апимондии.Условия хранения При температуре от 5 ºC до 20 ºC, в защищенном от прямых солнечных лучей местеСостав. Мёд натуральный 100%"
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
              const swiper = e.currentTarget.querySelector('.card-slider')?.swiper;
              if (swiper) swiper.autoplay.start();
            }}
            onMouseLeave={(e) => {
              const swiper = e.currentTarget.querySelector('.card-slider')?.swiper;
              if (swiper) {
                swiper.autoplay.stop();
                swiper.slideTo(0, 300);
              }
            }}
            onClick={() => openModal(product)}
          >
            <div className="card-image-wrapper">
              <div className="card-badge">{product.category}</div>
              <Swiper
                modules={[Pagination, Autoplay]}
                speed={400}
                grabCursor={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 1200, disableOnInteraction: false }}
                onSwiper={(swiper) => swiper.autoplay.stop()}
                slidesPerView={1}
                className="card-slider"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={img} 
                      alt={product.title} 
                      loading="lazy" // Оптимизация загрузки
                    />
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

      {/* МОДАЛЬНОЕ ОКНО (Исправленная структура) */}
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
                        <img src={img} alt="продукт" />
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
                
                <a href="https://t.me/your_bot" target="_blank" rel="noreferrer" className="btn-telegram-wide">
                  Заказать в Telegram
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
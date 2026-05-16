import 'swiper/css';
import 'swiper/css/effect-fade';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import './Sections.css';
import 'swiper/css/autoplay';

function Home() {
  const heroSlides = [
    {
      src: '/images/bg-honey-1.webp',
      alt: 'Натуральный мёд оптом — золотистые соты с мёдом',
    },
    {
      src: '/images/bg-honey-2.webp',
      alt: 'Оптовые поставки мёда — банки и соты на пасеке',
    },
    {
      src: '/images/bg-honey-3.webp',
      alt: 'Мёд от производителя — свежий урожай в стеклянной банке',
    },
    {
      src: '/images/bg-honey-9.webp',
      alt: 'Пасека и натуральный мёд для оптовых покупателей',
    },
  ];

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="hero-with-slider">
      <div className="hero-slider-background">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="hero-bg-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.src}>
              <div
                className="hero-slide-item"
                role="img"
                aria-label={slide.alt}
                style={{ backgroundImage: `url(${slide.src})` }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="hero-slide-img-sr"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="hero-overlay"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="section-content relative-content">
        <div className="home-hero-centered">
          <div className="welcome-card">
            <div className="welcome-badge">Оптовые поставки натурального мёда</div>

            <h1 className="main-title">
              Натуральный мёд оптом <br />
              <span>для магазинов, сетей и производств</span>
            </h1>

            <div className="welcome-message">
              <p>
                Мастер Мёда поставляет натуральный мёд урожая 2025 года в розничной фасовке, куботейнерах и крупных оптовых объёмах.
              </p>
              <p>
                Работаем с магазинами, маркетплейсами, кофейнями, кондитерскими, производствами и оптовыми покупателями.
              </p>
              <p>
                Официальные поставки через систему «Меркурий», полный пакет документов и стабильные объёмы от 15 кг до фуры.
              </p>
            </div>

            <div className="hero-actions">
              <button type="button" className="hero-cta-btn primary" onClick={scrollToProducts}>
                Смотреть продукцию
              </button>
              <a href="tel:+79062672783" className="hero-cta-btn secondary">
                Позвонить поставщику
              </a>
            </div>

            <div className="welcome-features">
              <div className="w-feature">От 15 кг до 20 тонн</div>
              <div className="w-feature">Документы и «Меркурий»</div>
              <div className="w-feature">Фасовка и опт</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

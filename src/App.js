import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Sections/Home';
import Products from './components/Sections/Products';
import WorkProcess from './components/Sections/WorkProcess';
import WhyUs from './components/Sections/WhyUs';
import Clients from './components/Sections/Clients';
import Partners from './components/Sections/Partners';
import News from './components/Sections/News';
import About from './components/Sections/About';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import UserAgreement from './components/UserAgreement';
import PersonalDataConsent from './components/PersonalDataConsent';
import CookiePolicy from './components/CookiePolicy';
import OrderForm from './components/Sections/OrderForm';
import './styles/App.css';

const SECTION_BACKGROUNDS = {
  default: 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 50%, #FFF8DC 100%)',
  linden: 'linear-gradient(135deg, #FFFACD 0%, #FFF8DC 50%, #FFFACD 100%)',
  buckwheat: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 50%, #DEB887 100%)',
  acacia: 'linear-gradient(135deg, #FDF5E6 0%, #FAFAD2 50%, #FDF5E6 100%)',
  partners: 'linear-gradient(135deg, #F5F5DC 0%, #E8E8AD 50%, #F5F5DC 100%)',
  news: 'linear-gradient(135deg, #FFF5E1 0%, #FFDAB9 50%, #FFF5E1 100%)',
  workProcess: 'linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 50%, #FFF8DC 100%)',
  whyUs: 'linear-gradient(135deg, #FDF5E6 0%, #FFEBCD 50%, #FDF5E6 100%)',
};

const SECTION_BG_BY_SECTION = {
  home: SECTION_BACKGROUNDS.default,
  products: SECTION_BACKGROUNDS.buckwheat,
  'work-process': SECTION_BACKGROUNDS.workProcess,
  'why-us': SECTION_BACKGROUNDS.whyUs,
  clients: SECTION_BACKGROUNDS.acacia,
  partners: SECTION_BACKGROUNDS.partners,
  news: SECTION_BACKGROUNDS.news,
  about: SECTION_BACKGROUNDS.linden,
};

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false); 
  const [activeLegalDocument, setActiveLegalDocument] = useState('privacy');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const savedScrollYRef = useRef(0);

  const [currentBg, setCurrentBg] = useState(SECTION_BACKGROUNDS.default);

  // 1. Эффект для прокрутки к секциям и смены фона
  useEffect(() => {
    const element = document.getElementById(currentSection);
    const isLocked = document.body.classList.contains('modal-open');

    if (element && currentSection !== 'home' && !isLocked) {
      const rect = element.getBoundingClientRect();
      const alreadyAtTarget = Math.abs(rect.top) < 50; 
      if (!alreadyAtTarget) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    setCurrentBg(SECTION_BG_BY_SECTION[currentSection] || SECTION_BACKGROUNDS.default);
  }, [currentSection]);

  // 2. ВОТ ЭТОТ НОВЫЙ ЭФФЕКТ ДЛЯ СКРЫТИЯ ТОП-БАРА (Вставил сюда)
  useEffect(() => {
    const handleScroll = () => {
      const topBar = document.querySelector('.top-bar');
      const nav = document.querySelector('.navigation');
      
      if (window.scrollY > 40) {
        topBar?.classList.add('scrolled');
        nav?.classList.add('scrolled');
      } else {
        topBar?.classList.remove('scrolled');
        nav?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Единая блокировка скролла и modal-open (форма, политика, товарная модалка)
  useLayoutEffect(() => {
    const anyModalOpen = isFormOpen || isPolicyOpen || isProductModalOpen;

    if (anyModalOpen) {
      if (!document.documentElement.classList.contains('modal-open')) {
        savedScrollYRef.current = window.scrollY;
      }
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return;
    }

    const scrollY = savedScrollYRef.current;
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, [isFormOpen, isPolicyOpen, isProductModalOpen]);

  const togglePolicy = () => {
    setActiveLegalDocument('privacy');
    setIsPolicyOpen(true);
  };

  const openLegalDocument = (documentType) => {
    setActiveLegalDocument(documentType);
    setIsPolicyOpen(true);
  };

  const renderLegalDocument = () => {
    const commonProps = {
      isOpen: isPolicyOpen,
      onClose: () => setIsPolicyOpen(false),
    };

    switch (activeLegalDocument) {
      case 'agreement':
        return <UserAgreement {...commonProps} />;
      case 'personal-data':
        return <PersonalDataConsent {...commonProps} />;
      case 'cookies':
        return <CookiePolicy {...commonProps} />;
      case 'privacy':
      default:
        return <PrivacyPolicy {...commonProps} />;
    }
  };

  return (
    <div className="app">
      <motion.div
        className="app-background"
        animate={{ background: currentBg }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
      />

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-content">
          <span className="top-bar-text">Свяжитесь с нами для поставок и покупок:</span>
          <div className="top-bar-contacts">
            <div className="top-bar-item">
              <span className="top-bar-label">Телефон: </span>
              <a href="tel:+79062672783" className="top-bar-link">+7 (906) 267-27-83</a>
            </div>
            <div className="top-bar-item">
              <span className="top-bar-label">Почта: </span>
              <a href="mailto:med.spb@list.ru" className="top-bar-link">med.spb@list.ru</a>
            </div>
          </div>
        </div>
      </div>

      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
        setIsFormOpen={setIsFormOpen} 
      />

      <div className="app-content">
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ willChange: 'opacity' }}
        >
          <Home id="home" />
          <Products
            id="products"
            onOpenForm={() => setIsFormOpen(true)}
            onProductModalChange={setIsProductModalOpen}
          />
          <WorkProcess onOpenForm={() => setIsFormOpen(true)} />
          <WhyUs onOpenForm={() => setIsFormOpen(true)} />
          <Clients id="clients" />
          <Partners id="partners" />
          <News id="news" />
          <About id="about" />
          <Footer
            onSectionChange={setCurrentSection}
            onOpenLegal={openLegalDocument}
          />
        </motion.div>

        <CookieConsent
          onOpenPolicy={togglePolicy}
          onOpenAgreement={() => openLegalDocument('agreement')}
        />

        <AnimatePresence>
          {isPolicyOpen && renderLegalDocument()}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="form-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              className="form-modal-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setIsFormOpen(false)}>×</button>
              <div className="hero-form-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
                <OrderForm onSuccess={() => setIsFormOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
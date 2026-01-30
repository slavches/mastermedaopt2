import React, { useEffect } from 'react';
import './CursorRepulsion.css';

function CursorRepulsion() {
  useEffect(() => {
    let animationFrameId;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const mouseX = lastMouseX;
        const mouseY = lastMouseY;

        // Получаем все интерактивные элементы
        const interactiveElements = document.querySelectorAll(
          '.product-card, .client-card, .partner-card, .news-card, .feature-card, .nav-link, .logo'
        );

        interactiveElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const elementX = rect.left + rect.width / 2;
          const elementY = rect.top + rect.height / 2;

          // Расстояние от курсора до центра элемента
          const distance = Math.sqrt(
            Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
          );

          // Радиус влияния (в пикселях)
          const influenceRadius = 150;

          if (distance < influenceRadius) {
            // Вычисляем силу отталкивания (чем ближе, тем сильнее)
            const force = (1 - distance / influenceRadius) * 20;
            
            // Направление отталкивания
            const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
            const moveX = Math.cos(angle) * force;
            const moveY = Math.sin(angle) * force;

            // Применяем трансформацию
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            element.style.transition = 'transform 0.15s ease-out';
          } else {
            // Возвращаем в исходное положение
            element.style.transform = 'translate(0, 0)';
          }
        });
      });
    };

    // Проверяем, что мы не на мобильном устройстве
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}

export default CursorRepulsion;

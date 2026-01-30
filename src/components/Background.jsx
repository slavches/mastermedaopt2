import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Background.css';

function Background({ selectedProduct }) {
  const containerRef = useRef(null);

  // Генерируем больше капель для более реалистичного эффекта
  const drops = Array.from({ length: 15 }, (_, i) => {
    const x = Math.random() * 100; // Процент от ширины
    const delay = Math.random() * 5;
    const duration = 25 + Math.random() * 15;
    const size = 20 + Math.random() * 30;
    
    return (
      <motion.div
        key={i}
        className="honey-drop"
        style={{
          left: `${x}%`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        initial={{ 
          y: -100, 
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          y: '100vh',
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.8],
          x: [
            `${x}%`,
            `${x + (Math.random() - 0.5) * 2}%`,
            `${x + (Math.random() - 0.5) * 2}%`,
            `${x}%`
          ]
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />
    );
  });

  return (
    <div ref={containerRef} className="background-container">
      {drops}
    </div>
  );
}

export default Background;

import React from 'react';
import { motion } from 'framer-motion';

function HoneyDrop() {
  // Случайное положение
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  // Анимация движения вниз
  const dropVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: window.innerHeight + 100,
      opacity: 1,
      transition: {
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  return (
    <motion.div
      className="honey-drop"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#FFA500', // Цвет мёда
        zIndex: 1,
      }}
      variants={dropVariants}
      initial="initial"
      animate="animate"
      transition={{ type: 'spring', stiffness: 300 }}
    />
  );
}

export default HoneyDrop;
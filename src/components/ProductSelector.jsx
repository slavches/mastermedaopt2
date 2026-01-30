import React from 'react';

function ProductSelector({ onSelect, selected }) {
  const products = [
    { id: 'default', label: 'Основной' },
    { id: 'linden', label: 'Липовый мёд' },
    { id: 'buckwheat', label: 'Гречишный мёд' },
    { id: 'acacia', label: 'Акациевый мёд' },
  ];

  return (
    <div className="product-selector">
      <h3>Выберите продукт:</h3>
      <div className="buttons">
        {products.map((prod) => (
          <button
            key={prod.id}
            onClick={() => onSelect(prod.id)}
            className={selected === prod.id ? 'active' : ''}
          >
            {prod.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductSelector;
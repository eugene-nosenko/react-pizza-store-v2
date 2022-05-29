import React from 'react';

export const Categories = ({ categoryId, onChangeCategory }) => {
  const categories = ['Pizzas', 'Vegetarian', 'Meat', 'Cheese', 'Spicy', 'Grill'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? 'active' : ''}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

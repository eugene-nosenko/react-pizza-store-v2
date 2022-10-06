import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: any;
};

export const Categories: React.FC<CategoriesProps> = ({ categoryId, onChangeCategory }) => {
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

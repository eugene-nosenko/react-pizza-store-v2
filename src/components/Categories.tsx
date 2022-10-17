import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
};
const categories = ['Pizzas', 'Vegetarian', 'Meat', 'Cheese', 'Spicy', 'Grill'];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
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
  }
);

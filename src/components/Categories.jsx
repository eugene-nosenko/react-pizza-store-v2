import React from 'react';

export const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = ['Pizzas', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Сalzone'];

  const onClickCategory = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={activeCategory === index ? 'active' : false}
            key={index}
          >
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

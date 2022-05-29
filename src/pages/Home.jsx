import React from 'react';

import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ id: 'popularity', name: 'popularity' });

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType.id;

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://629146cd665ea71fe1436b03.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortBy]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
          <Sort sortType={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Pizzas</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />)}
        </div>
      </div>
    </>
  );
};

import React from 'react';

import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort';
import { itemsPerPage } from '../constants';

export const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ id: 'popularity', name: 'popularity' });

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType.id;
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://629146cd665ea71fe1436b03.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}&${category}&sortBy=${sortBy}&order=desc${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortBy, search, currentPage]);

  const skeletonArray = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzasArray = pizzas
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj, index) => <PizzaBlock key={index} {...obj} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
          <Sort sortType={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Pizzas</h2>
        <div className="content__items">{isLoading ? skeletonArray : pizzasArray}</div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </>
  );
};

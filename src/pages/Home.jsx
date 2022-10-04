import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Sort, sortList } from '../components/Sort';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state) => state.pizzas);
  const { categoryId, currentPage, sort } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.id;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        // order,
        category,
        search,
        currentPage
      })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.id,
        categoryId,
        currentPage
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.id, currentPage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.id === params.sortBy);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    getPizzas();

    window.scrollTo(0, 0);
  }, [categoryId, sort.id, searchValue, currentPage]);

  const skeletonArray = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzasArray = items.map((obj, index) => <PizzaBlock key={index} {...obj} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Pizzas</h2>
        {status === 'rejected' ? (
          <div className="content__error-info">
            <h2>Oops, error 🥲</h2>
            <p>Sorry, can't get pizzas. Please try later.</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletonArray : pizzasArray}</div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

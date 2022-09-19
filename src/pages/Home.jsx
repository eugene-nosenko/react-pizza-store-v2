import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Sort, sortList } from '../components/Sort';
import { itemsPerPage } from '../constants';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, currentPage, sort } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.id;
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://629146cd665ea71fe1436b03.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}&${category}&sortBy=${sortBy}&order=desc&${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
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
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.id, searchValue, currentPage]);

  const skeletonArray = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzasArray = pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Pizzas</h2>
        <div className="content__items">{isLoading ? skeletonArray : pizzasArray}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

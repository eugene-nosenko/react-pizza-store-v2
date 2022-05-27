import React from 'react';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Skeleton } from './components/PizzaBlock/Skeleton';
import { Sort } from './components/Sort';
import './scss/app.scss';
// import pizzas from './assets/pizzas.json';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://629146cd665ea71fe1436b03.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Pizzas</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />)}
            {pizzas.map((obj, index) =>
              isLoading ? <Skeleton /> : <PizzaBlock key={index} {...obj} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

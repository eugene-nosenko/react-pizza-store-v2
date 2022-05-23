import React from 'react';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';
import './scss/app.scss';
import pizzas from './assets/pizzas.json';

function App() {
  console.log('pizzas', pizzas);
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
            {pizzas.map((obj, index) => (
              <PizzaBlock key={index} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

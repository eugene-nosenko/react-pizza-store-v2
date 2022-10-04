import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const FullPizza = () => {
  const [pizza, setPizza] = React.useState({});
  const { id } = useParams();

  const fetchPizzaById = async () => {
    try {
      const { data } = await axios.get(`https://629146cd665ea71fe1436b03.mockapi.io/items/${id}`);
      setPizza(data);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  React.useEffect(() => {
    fetchPizzaById();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '500px'
      }}
    >
      <h2 style={{ paddingBottom: '1rem' }}>
        {pizza.title} {pizza.price} $
      </h2>
      <img src={pizza.imageUrl} alt={pizza.title} />
    </div>
  );
};
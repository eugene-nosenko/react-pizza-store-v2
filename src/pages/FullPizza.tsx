import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{ imageUrl: string; title: string; price: number }>({
    imageUrl: '',
    title: '',
    price: 0
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPizzaById = async () => {
    try {
      const { data } = await axios.get(`https://629146cd665ea71fe1436b03.mockapi.io/items/${id}`);
      setPizza(data);
    } catch (error) {
      alert('Sorry, error');
      navigate('/');
    }
  };

  React.useEffect(() => {
    fetchPizzaById();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
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
      <h2 style={{ paddingBottom: '1rem' }}>{pizza.title && `${pizza.title} ${pizza.price} $`}</h2>
      <img src={pizza.imageUrl} alt={pizza.title} />
    </div>
  );
};

import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>🥲</span>
      <br />
      <h1>Not Found</h1>
    </div>
  );
};

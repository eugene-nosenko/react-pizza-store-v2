import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';
import { itemsPerPage } from '../../constants';

type PaginationProps = {
  currentPage: number;
  onChangePage: (i: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <div style={{ paddingBottom: '50px' }}>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={itemsPerPage}
        pageCount={2}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';
import { itemsPerPage } from '../../constants';
// const handlePageClick = (event) => {
//   const newOffset = (event.selected * itemsPerPage) % items.length;
//   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
//   setItemOffset(newOffset);
// };

export const Pagination = ({ currentPage, onChangePage }) => {
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
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

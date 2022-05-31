import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';
import { itemsPerPage } from '../../constants';
// const handlePageClick = (event) => {
//   const newOffset = (event.selected * itemsPerPage) % items.length;
//   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
//   setItemOffset(newOffset);
// };

export const Pagination = ({ onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={itemsPerPage}
        pageCount={2}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

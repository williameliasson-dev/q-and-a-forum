import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ maxPage, page }) => {
  function renderPagination() {
    if (maxPage > 5 && page < 5) {
      return (
        <>
          <a
            href="/questions?page=1"
            className={page === 1 || page === 0 ? styles.current : ""}
          >
            1
          </a>
          <a
            href="/questions?page=2"
            className={page === 2 ? styles.current : ""}
          >
            2
          </a>
          <a
            href="/questions?page=3"
            className={page === 3 ? styles.current : ""}
          >
            3
          </a>
          <a
            href="/questions?page=4"
            className={page === 4 ? styles.current : ""}
          >
            4
          </a>
          <a
            href="/questions?page=5"
            className={page === 5 ? styles.current : ""}
          >
            5
          </a>
          ...
          <a href={`/questions?page=${maxPage}`}>{maxPage}</a>
        </>
      );
    }
    if (
      page >= 5 &&
      page != maxPage - 2 &&
      page != maxPage - 1 &&
      page != maxPage
    ) {
      return (
        <>
          <a href={`/questions?page=1`}>1</a>
          ...
          <a href={`/questions?page=${page - 2}`}>{page - 2}</a>
          <a href={`/questions?page=${page - 1}`}>{page - 1}</a>
          <a href={`/questions?page=${page}`} className={styles.current}>
            {page}
          </a>
          <a href={`/questions?page=${page + 1}`}>{page + 1}</a>
          <a href={`/questions?page=${page + 2}`}>{page + 2}</a>
          ...
          <a href={`/questions?page=${maxPage}`}>{maxPage}</a>
        </>
      );
    }
    if (page === maxPage - 2 || page === maxPage - 1 || page === maxPage) {
      return (
        <>
          <a href={`/questions?page=1`}>1</a>
          ...
          <a
            href={`/questions?page=${maxPage - 3}`}
            className={page === maxPage - 3 ? styles.current : ""}
          >
            {maxPage - 3}
          </a>
          <a
            href={`/questions?page=${maxPage - 2}`}
            className={page === maxPage - 2 ? styles.current : ""}
          >
            {maxPage - 2}
          </a>
          <a
            href={`/questions?page=${maxPage - 1}`}
            className={page === maxPage - 1 ? styles.current : ""}
          >
            {maxPage - 1}
          </a>
          <a
            href={`/questions?page=${maxPage}`}
            className={page === maxPage ? styles.current : ""}
          >
            {maxPage}
          </a>
        </>
      );
    }
  }
  return (
    <div className={styles.pagination}>
      {page > 1 && <a href={`/questions?page=${page - 1}`}>Prev</a>}
      {renderPagination()}
      {page < maxPage && <a href={`/questions?page=${page + 1}`}>Next</a>}
    </div>
  );
};

export default Pagination;

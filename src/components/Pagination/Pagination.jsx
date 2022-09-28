import React from "react";
import styles from "./Pagination.module.scss";
import Link from "next/link";

const Pagination = ({ maxPage, page }) => {
  function renderPagination() {
    if (maxPage > 5 && page < 5) {
      return (
        <>
          <Link
            href="/questions?page=1"
            className={page === 1 || page === 0 ? styles.current : ""}
          >
            1
          </Link>
          <Link
            href="/questions?page=2"
            className={page === 2 ? styles.current : ""}
          >
            2
          </Link>
          <Link
            href="/questions?page=3"
            className={page === 3 ? styles.current : ""}
          >
            3
          </Link>
          <Link
            href="/questions?page=4"
            className={page === 4 ? styles.current : ""}
          >
            4
          </Link>
          <Link
            href="/questions?page=5"
            className={page === 5 ? styles.current : ""}
          >
            5
          </Link>
          ...
          <Link href={`/questions?page=${maxPage}`}>{maxPage}</Link>
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
          <Link href={`/questions?page=1`}>1</Link>
          ...
          <Link href={`/questions?page=${page - 2}`}>{page - 2}</Link>
          <Link href={`/questions?page=${page - 1}`}>{page - 1}</Link>
          <Link href={`/questions?page=${page}`} className={styles.current}>
            {page}
          </Link>
          <Link href={`/questions?page=${page + 1}`}>{page + 1}</Link>
          <Link href={`/questions?page=${page + 2}`}>{page + 2}</Link>
          ...
          <Link href={`/questions?page=${maxPage}`}>{maxPage}</Link>
        </>
      );
    }
    if (page === maxPage - 2 || page === maxPage - 1 || page === maxPage) {
      return (
        <>
          <Link href={`/questions?page=1`}>1</Link>
          ...
          <Link
            href={`/questions?page=${maxPage - 3}`}
            className={page === maxPage - 3 ? styles.current : ""}
          >
            {maxPage - 3}
          </Link>
          <Link
            href={`/questions?page=${maxPage - 2}`}
            className={page === maxPage - 2 ? styles.current : ""}
          >
            {maxPage - 2}
          </Link>
          <Link
            href={`/questions?page=${maxPage - 1}`}
            className={page === maxPage - 1 ? styles.current : ""}
          >
            {maxPage - 1}
          </Link>
          <Link
            href={`/questions?page=${maxPage}`}
            className={page === maxPage ? styles.current : ""}
          >
            {maxPage}
          </Link>
        </>
      );
    }
  }
  return (
    <div className={styles.pagination}>
      {page > 1 && <Link href={`/questions?page=${page - 1}`}>Prev</Link>}
      {renderPagination()}
      {page < maxPage && <Link href={`/questions?page=${page + 1}`}>Next</Link>}
    </div>
  );
};

export default Pagination;

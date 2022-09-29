import React from "react";
import styles from "./Pagination.module.scss";
import Link from "next/link";

const Pagination = ({ maxPage, page, tag, filter }) => {
  function renderPagination() {
    let pages = [];
    if (maxPage < 5) {
      for (let i = 0; i < maxPage; i++) {
        pages.push(i + 1);
      }
      return pages?.map((i) => {
        return (
          <>
            <Link
              key={i}
              href={`/questions?page=${i}&filter=${filter}&tag=${tag}`}
            >
              <div className={page === i ? styles.current : ""}> {i}</div>
            </Link>
          </>
        );
      });
    }

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
    if (
      (page === maxPage - 2 && maxPage > 5) ||
      (page === maxPage - 1 && maxPage > 5) ||
      (page === maxPage && maxPage > 5)
    ) {
      return (
        <>
          <Link href={`/questions?page=1`}>1</Link>
          ...
          <Link
            href={`/questions?page=${maxPage - 3}`}
            className={page === maxPage - 3 ? styles.current : ""}
          >
            <div> {maxPage - 3}</div>
          </Link>
          <Link
            href={`/questions?page=${maxPage - 2}`}
            className={page === maxPage - 2 ? styles.current : ""}
          >
            <div> {maxPage - 2}</div>
          </Link>
          <Link
            href={`/questions?page=${maxPage - 1}`}
            className={page === maxPage - 1 ? styles.current : ""}
          >
            <div> {maxPage - 1}</div>
          </Link>
          <Link
            href={`/questions?page=${maxPage}`}
            className={page === maxPage ? styles.current : ""}
          >
            <div>{maxPage}</div>
          </Link>
        </>
      );
    }
  }
  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <Link href={`/questions?page=${page - 1}`}>
          <div>Prev</div>
        </Link>
      )}
      {renderPagination()}
      {page !== maxPage && (
        <Link href={`/questions?page=${page + 1}`}>
          <div>Next</div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;

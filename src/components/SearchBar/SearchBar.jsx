import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SearchBar.module.scss";
import useSWR from "swr";
import { useRouter } from "next/router";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  let { data: fetchedResults, error } = useSWR(
    () => `/api/search/get?title=${search}`,
    fetcher,
    { refreshInterval: 100 }
  );

  useEffect(() => {
    if (fetchedResults) {
      setResults(fetchedResults);
    }
  }, [search, fetchedResults]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/questions/${results[0]._id}`);
        setSearch("");
      }}
    >
      <label htmlFor="search-input" className={styles.searchbar}>
        <img alt="search" src="/search.svg"></img>
        <input
          id="search-input"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search for a question by title..."
          type="text"
        />
      </label>
      {results.length > 0 && (
        <div className={styles.results}>
          {results?.map((result, i) => {
            return (
              <div key={i}>
                <Link href={`/questions/${result._id}`}>
                  <div className={styles.result} onClick={() => setSearch("")}>
                    <img alt="user" src={`${result.userImg}`} />
                    <div>
                      <h4>{result.title}</h4>
                      <p>{result.userName}</p>
                      <p>{result.content.slice(0, 80)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default SearchBar;

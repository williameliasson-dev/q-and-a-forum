import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SearchBar.module.scss";
import useSWR from "swr";
import { useRouter } from "next/router";
import Button from "../Button";

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
  console.log(results);
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
      <div className={styles.searchbar}>
        <img src="/search.svg" className="h-6"></img>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search for a question by title..."
          type="text"
        />
      </div>
      {results.length > 0 && (
        <div className={styles.results}>
          {results?.map((result, i) => {
            return (
              <div key={i}>
                <Link href={`/questions/${result._id}`}>
                  <div className={styles.result} onClick={() => setSearch("")}>
                    <img src={`${result.userImg}`} />
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

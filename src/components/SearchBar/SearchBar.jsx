import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SearchBar.module.scss";
import useSWR from "swr";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true);
  const [results, setResults] = useState([]);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  let { data: fetchedResults, error } = useSWR(
    () => (shouldFetch ? `/api/search/get?title=${search}` : null),
    fetcher,
    { refreshInterval: 100 }
  );

  useEffect(() => {
    if (fetchedResults && shouldFetch) {
      setResults(fetchedResults);
    }
  }, [search, fetchedResults]);

  return (
    <div>
      <form>
        <div className={styles.searchbar}>
          <div className={styles.search}>
            <img src="/search.svg" className="h-6"></img>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search..."
              type="text"
            />
          </div>
          <div className={styles.results}>
            {results?.map((result, i) => {
              return (
                <div key={i}>
                  <Link href={`/questions/${result._id}`}>{result.title}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

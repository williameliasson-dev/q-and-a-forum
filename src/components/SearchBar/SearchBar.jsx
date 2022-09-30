import React from "react";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import useSWR from "swr";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [shouldFetch, setShouldFetch] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  let { data: comments, error } = useSWR(
    () => (shouldFetch ? "/api/data" : null),
    fetcher
  );

  useEffect(() => {
    setShouldFetch(true);
    if (shouldFetch === true) {
      setShouldFetch(!shouldFetch);
    }
  }, [search]);

  return (
    <div>
      <form>
        <div className={styles.searchbar}>
          <img src="/search.svg" className="h-6"></img>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
            type="text"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

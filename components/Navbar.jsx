import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button className={styles.menubutton}>
          <img src="menu.svg"></img>{" "}
        </button>
        <Link href="/">
          <a className={styles.brand}>
            {" "}
            <img
              src="logo-stackoverflow.svg"
              className="h-[30px] object-fill m-2"
            ></img>{" "}
          </a>
        </Link>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/">
          <a>About</a>
        </Link>
        <Link href="/">
          <a>Github</a>
        </Link>
        <form>
          <div className={styles.searchbar}>
            <img src="search.svg" className="h-6"></img>
            <input placeholder="Search..." type={"text"} />
          </div>
        </form>
        <button className={styles.loginbtn}>Log in</button>
        <button className={styles.signupbtn}>Sign up</button>
      </nav>
    </header>
  );
};

export default Navbar;

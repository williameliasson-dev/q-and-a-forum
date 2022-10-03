import React from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";
import Button from "./Button";
import { useSession, signIn, signOut } from "next-auth/react";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = () => {
  const { data: session } = useSession();

  function renderUserSection() {
    if (session) {
      return (
        <div className={styles.userInfo}>
          <img src={`${session.user.image}`}></img>
          <Button variant={"blue"} onClick={() => signOut()}>
            {" "}
            Log out
          </Button>
        </div>
      );
    } else
      return (
        <>
          <Button variant={"btn"} onClick={() => signIn()}>
            Log in
          </Button>
        </>
      );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.brand}>
            {" "}
            <img
              alt="logo"
              src="/logo-stackoverflow.svg"
              className="h-[30px] object-fill m-2"
            ></img>{" "}
          </a>
        </Link>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/questions?page=1&filter=newest&tag=undefined">
          <a>Questions</a>
        </Link>
        <Link href="https://github.com/williameliasson-dev/q-and-a-forum">
          <a>Github</a>
        </Link>
        <SearchBar />
        {renderUserSection()}
      </nav>
    </header>
  );
};

export default Navbar;

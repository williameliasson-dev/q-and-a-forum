import React from "react";
import styles from "../styles/LeftSidebar.module.scss";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navlinks}>
        <Link href="/">
          <a className={styles.home}>Home</a>
        </Link>
        <div>
          <span>PUBLIC</span>

          <div className={styles.publiclinks}>
            <Link href="/questions">
              <a>Questions</a>
            </Link>
            <Link href="/">
              <a>Tags</a>
            </Link>
            <Link href="/">
              <a>Users</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

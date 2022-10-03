import React from "react";
import styles from "../styles/LeftSidebar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const LeftSidebar = () => {
  const router = useRouter();
  let page = router.pathname;

  return (
    <div className={styles.container}>
      <div className={styles.navlinks}>
        <Link href="/">
          <a className={styles.home}>Home</a>
        </Link>
        <div>
          <span>PUBLIC</span>

          <div className={styles.publiclinks}>
            <Link href="/questions?page=1&filter=newest&tag=undefined">
              <a className={page === "/questions" ? styles.current : ""}>
                Questions
              </a>
            </Link>
            <Link href="/questions/tags">
              <a className={page === "/questions/tags" ? styles.current : ""}>
                Tags
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

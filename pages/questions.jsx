import React from "react";
import styles from "../styles/Questions.module.scss";
import LeftSidebar from "../components/LeftSidebar";

const questions = () => {
  return (
    <div className={styles.container}>
      <LeftSidebar />
      <div className={styles.questions}>questions</div>
    </div>
  );
};

export default questions;

import React from "react";
import styles from "@/styles/Questions.module.scss";
import LeftSidebar from "@/components/LeftSidebar";
import Button from "@/components/Button";

const questions = () => {
  return (
    <div className={styles.container}>
      <LeftSidebar />
      <div className={styles.questions}>
        <header className={styles.questionshead}>
          <div className={styles.headsection}>
            <h1>All Questions</h1>
            <Button variant={"blue"}>Ask a question</Button>
          </div>
          <div className={styles.headsection2}>
            <h2>22 questions</h2>
            <div className={styles.headsection2btn}>
              <Button variant={"transparent"}>Newest</Button>
              <Button variant={"transparent"}>Active</Button>
              <Button variant={"transparent"}>Bountied</Button>
              <Button variant={"transparent"}>Unanswerd</Button>
            </div>
            <Button variant={"btn"}>Filter</Button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default questions;

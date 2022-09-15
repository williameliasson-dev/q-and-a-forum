import React from "react";
import styles from "@/styles/Ask.module.scss";
import Button from "@/components/Button";

const ask = () => {
  return (
    <div className={styles["ask-container"]}>
      <form>
        <h1>Ask a public question</h1>
        <div className={styles.ask}>
          <div className={styles["ask-title"]}>
            <h2>Title</h2>
            <p>
              Be specific and imagine you’re asking a question to another person
            </p>
            <input placeholder="e.g. Is there an R function for finding the index of an element in a vector?" />
          </div>
          <div className={styles["ask-body"]}>
            <h2>Body</h2>
            <p>
              Include all the information someone would need to answer your
              question
            </p>
            <textarea />
          </div>
          <div className={styles["ask-tags"]}>
            <h2>Tags</h2>
            <p>Add up to 5 tags to describe what your question is about</p>
            <input placeholder="e.g. (angularjs javascript string)" />
          </div>
        </div>
        <Button type="submit" variant={"blue"}>
          Review your question
        </Button>
      </form>
    </div>
  );
};

export default ask;

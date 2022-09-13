import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Questions.module.scss";
import LeftSidebar from "@/components/LeftSidebar";
import Button from "@/components/Button";
import { fs } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  startAt,
  orderBy,
} from "firebase/firestore";

const questions = () => {
  const router = useRouter();
  let page = router.query.page || 0;
  console.log(page);

  useEffect(() => {
    if (page >= 1) {
      console.log(page);
      const q = query(
        collection(fs, "questions"),
        orderBy("title"),
        limit(page * 10)
      );
      async function get() {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        setQuestions(
          querySnapshot.docs.slice(-10).map((doc) => {
            return doc.data();
          })
        );
      }
      get();
    }
  }, [page]);

  const [questions, setQuestions] = useState([]);

  return (
    <div className={styles.container}>
      <LeftSidebar />
      <div className={styles.questions}>
        <header className={styles.head}>
          <div className={styles["head-top"]}>
            <h1>All Questions</h1>
            <a href="questions/ask">
              <Button variant={"blue"}>Ask a question</Button>
            </a>
          </div>
          <div className={styles["head-bottom"]}>
            <h2>{questions.length} questions</h2>
            <div className={styles["head-bottom-btn"]}>
              <Button variant={"transparent"}>Newest</Button>
              <Button variant={"transparent"}>Active</Button>
              <Button variant={"transparent"}>Bountied</Button>
              <Button variant={"transparent"}>Unanswerd</Button>
            </div>
            <Button variant={"btn"}>
              Filter<img src="filter.svg"></img>
            </Button>
          </div>
        </header>
        <div>
          {questions.map((questions, i) => {
            return (
              <div className={styles["question"]} key={i}>
                <div className={styles["question-stats"]}>
                  <span>0 votes</span>
                  <span>0 answers</span>
                  <span>0 views</span>
                </div>
                <div className={styles["question-content"]}>
                  <h1>{questions.title}</h1>
                  <p>{questions.content}</p>
                  <div>
                    <span className={styles["question-meta"]}>
                      <img src={`/${questions.userImg}`} />
                      <p>{questions.userName}</p>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          href={{
            pathname: "/questions",
            query: { page: page - 2 },
          }}
        >
          <Button>Prev</Button>
        </Link>
        <Link
          href={{
            pathname: "/questions",
            query: { page: ++page },
          }}
        >
          <Button>Next</Button>
        </Link>
      </div>
    </div>
  );
};

export default questions;

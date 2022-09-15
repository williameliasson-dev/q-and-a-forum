import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Questions.module.scss";
import LeftSidebar from "@/components/LeftSidebar";
import Button from "@/components/Button";
import connectDB from "@/../utils/connectDB";
import Question from "@/../models/question";
import { faker, swamp } from "fongus";
import Pagination from "@/components/Pagination/Pagination";

const questions = ({ questions, questionsAmount, maxPage }) => {
  const router = useRouter();
  let page = parseInt(router.query.page) || 0;

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

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
            <h2>{questionsAmount} questions</h2>
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
                      <img src={`${questions.userImg}`} />
                      <p>{questions.userName}</p>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.pagination}>
          <Pagination maxPage={maxPage} page={page} />
        </div>
      </div>
    </div>
  );
};

export default questions;

export async function getServerSideProps(context) {
  await connectDB();
  const questionsAmount = await Question.count();

  const docsPerPage = 20;
  const maxPage = Math.ceil(questionsAmount / docsPerPage);

  const page = Math.min(
    maxPage,
    context.query.page > 0 ? context.query.page : 1
  );

  const questions = await Question.find()
    .limit(20)
    .skip(20 * (page - 1));

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
      questionsAmount,
      maxPage,
    }, // will be passed to the page component as props
  };
}

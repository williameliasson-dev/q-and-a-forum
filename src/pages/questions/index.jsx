import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Questions.module.scss";
import LeftSidebar from "@/components/LeftSidebar";
import Button from "@/components/Button";
import connectDB from "@/../utils/connectDB";
import Question from "@/../models/question";
import Vote from "models/vote";
import Comment from "models/comment";
import renderDates from "utils/renderDates";
import Pagination from "@/components/Pagination/Pagination";

const Questions = ({
  questions,
  questionsAmount,
  maxPage,
  votes,
  comments,
}) => {
  const router = useRouter();
  let page = parseInt(router.query.page) || 1;

  useEffect(() => {
    renderDates();
  }, []);

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
              <Link href={`/questions?page=${page}&filter=newest`}>
                <Button variant={"transparent"}>Newest</Button>
              </Link>
              <Link href={`/questions?page=${page}&filter=unanswered`}>
                <Button variant={"transparent"}>Unanswered</Button>
              </Link>
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
                  <span>
                    {votes[i]} {votes[i] === 1 && "vote"}
                    {votes[i] === 0 && "votes"}
                    {votes[i] > 1 && "votes"}
                  </span>
                  <span>
                    {" "}
                    {comments[i]} {comments[i] === 1 && "answers"}
                    {comments[i] === 0 && "answers"}
                    {comments[i] > 1 && "answers"}
                  </span>
                </div>
                <div className={styles["question-content"]}>
                  <Link href={`questions/${questions._id}`}>
                    <a>
                      <h1>{questions.title}</h1>
                    </a>
                  </Link>

                  <p>{questions.content.slice(0, 130)}</p>
                  {questions?.tags?.map((tag, i) => {
                    return (
                      <Link key={i} href={`/questions?tag=${tag}`}>
                        <span className={styles.tag}>{tag}</span>
                      </Link>
                    );
                  })}
                  <div>
                    <span className={styles["question-meta"]}>
                      <img src={`${questions.userImg}`} />
                      <p>{questions.userName}</p>
                      <p>asked {renderDates(questions.createdAt)} ago</p>
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

export default Questions;

export async function getServerSideProps(context) {
  await connectDB();
  const questionsAmount = await Question.count();

  const docsPerPage = 20;
  const maxPage = Math.ceil(questionsAmount / docsPerPage);

  const page = Math.min(
    maxPage,
    context.query.page > 0 ? context.query.page : 1
  );

  const filterQuestions = async () => {
    if (context.query.filter === "unanswered") {
      return await Question.find({ solution: undefined })
        .limit(20)
        .skip(20 * (page - 1));
    }
    if (context.query.filter === "newest") {
      return await Question.find({})
        .sort("-createdAt")
        .limit(20)
        .skip(20 * (page - 1));
    }
    if (context.query.tag) {
      return await Question.find({ tags: context.query.tag })
        .sort("-createdAt")
        .limit(20)
        .skip(20 * (page - 1));
    }
    return await Question.find()
      .limit(20)
      .skip(20 * (page - 1));
  };

  const questions = await filterQuestions();

  const votes = await Promise.all(
    questions.map(async (q) => await Vote.countDocuments({ qid: q._id }))
  );

  const comments = await Promise.all(
    questions.map(async (q) => await Comment.countDocuments({ qid: q._id }))
  );

  return {
    props: {
      votes,
      comments,
      questions: JSON.parse(JSON.stringify(questions)),
      questionsAmount,
      maxPage,
    }, // will be passed to the page component as props
  };
}

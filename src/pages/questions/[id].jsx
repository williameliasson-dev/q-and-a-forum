import React, { useState, useEffect } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import styles from "@/styles/Question.module.scss";
import Question from "models/question";
import connectDB from "utils/connectDB";
import Button from "@/components/Button";
import renderDates from "utils/renderDates";

const QuestionId = ({ question }) => {
  const [sinceCreation, setSinceCreation] = useState("");

  useEffect(() => {
    renderDates();
  }, []);

  return (
    <div className={styles.wrapper}>
      <LeftSidebar />
      <div className={styles.question}>
        <div className={styles["question-top"]}>
          <h1>{question.title}</h1>
          <p>Asked {renderDates(question.createdAt)} ago</p>
        </div>

        <div className={styles["question-content"]}>
          <div className={styles.voting}>
            <Button>+</Button>
            <p>0</p>
            <Button>-</Button>
          </div>
          <p>{question.content}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionId;

export async function getStaticProps(context) {
  const questionId = context.params.id;
  await connectDB();

  const question = await Question.findById(questionId).select({ _id: 0 });
  return {
    props: {
      question: JSON.parse(JSON.stringify(question)),
    },
  };
}

export async function getStaticPaths() {
  await connectDB();

  const questions = await Question.find({}).select("_id");

  const paths = questions.map((questions) => {
    return { params: { id: questions._id.toString() } };
  });
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

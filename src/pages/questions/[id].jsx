import React, { useState, useEffect } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import styles from "@/styles/Question.module.scss";
import Question from "models/question";
import connectDB from "utils/connectDB";
import Button from "@/components/Button";

const QuestionId = ({ question }) => {
  const [sinceCreation, setSinceCreation] = useState("");

  useEffect(() => {
    getDateDiffrence();
  }, [sinceCreation]);

  function getDateDiffrence(createdAt) {
    const curTime = new Date();
    const postTime = new Date(createdAt);
    let hSuffix;
    let mSuffix;

    let delta = Math.abs(curTime - postTime) / 1000;

    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    if (hours > 1) {
      hSuffix = "s";
    } else {
      hSuffix = "";
    }

    if (minutes > 1) {
      mSuffix = "s";
    } else {
      mSuffix = "";
    }

    let seconds = delta % 60; // in theory the modulus is not required

    console.log(days, hours, minutes);
    if (hours <= 0 && days === 0) {
      return `${minutes} minute${mSuffix} ago`;
    }
    if (hours >= 1 && days === 0) {
      return `${hours} hour${hSuffix} ago`;
    }
    if (days >= 1 && days < 2 && hours > 0) {
      return `1 day and ${hours} hour${hSuffix}  ago`;
    }
    if (days >= 2 && days < 7 && hours != 0) {
      return `${days} days and ${hours} hour${hSuffix} ago`;
    }
    if (days >= 2 && days < 7 && hours === 0) {
      return `${days} days and ${minutes} minutes ago`;
    }
    return "DATE ERROR - PLEASE CONTACT SUPPORT";
  }

  return (
    <div className={styles.wrapper}>
      <LeftSidebar />
      <div className={styles.question}>
        <div className={styles["question-top"]}>
          <h1>{question.title}</h1>
          <p>{getDateDiffrence(question.createdAt)}</p>
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

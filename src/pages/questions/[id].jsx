import React, { useState, useEffect } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import styles from "@/styles/Question.module.scss";
import Question from "models/question";
import Vote from "models/vote";
import connectDB from "utils/connectDB";
import Button from "@/components/Button";
import renderDates from "utils/renderDates";

const QuestionId = ({ question, votes }) => {
  const [voteCount, setVoteCount] = useState(0);
  const [data, setData] = useState("");

  useEffect(() => {
    renderDates();
    countVotes();
  }, [data]);

  function countVotes() {
    votes.forEach((vote) => {
      if (vote.type === "up") {
        setVoteCount(voteCount++);
      }
      if (vote.type === "down") {
        setVoteCount(voteCount--);
      }
    });
  }

  async function postVote(type) {
    const vote = {
      qid: question._id,
      type,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(vote),
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:3000/api/votes/create",
      requestOptions
    );
    const data = await response.json();
    setData(data);
  }

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
            <Button onClick={() => postVote("up")}>
              <img alt="upvote" src="/triangle.svg"></img>
            </Button>
            <span>{voteCount}</span>
            <Button onClick={() => postVote("down")}>
              <img alt="downvote" src="/triangle.svg"></img>
            </Button>
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

  const question = await Question.findById(questionId);
  const votes = await Vote.find({ qid: questionId });

  return {
    props: {
      question: JSON.parse(JSON.stringify(question)),
      votes: JSON.parse(JSON.stringify(votes)),
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
    fallback: "blocking", // false or 'blocking'
  };
}

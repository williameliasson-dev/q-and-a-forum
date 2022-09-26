import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/LeftSidebar";
import styles from "@/styles/Question.module.scss";
import Question from "models/question";
import Vote from "models/vote";
import Comment from "models/comment";
import connectDB from "utils/connectDB";
import Button from "@/components/Button";
import renderDates from "utils/renderDates";
import { useSession } from "next-auth/react";

const QuestionId = ({ question, votes, comments }) => {
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  const router = useRouter();

  const isOp = () => session?.user?._id === question.userId;

  const newComment = {
    qid: router.query.id,
    content: comment,
  };

  const voteCount = votes.reduce(
    (prev, current) => prev + (current.type === "up" ? 1 : -1),
    0
  );

  console.log(session);

  async function postSolution(cid) {
    const solutionData = {
      qid: router.query.id,
      uid: session?.user?._id,
      cid: cid,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(solutionData),
      redirect: "follow",
    };

    await fetch("http://localhost:3000/api/questions/solution", requestOptions);
  }

  async function postComment() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newComment),
      redirect: "follow",
    };

    await fetch("http://localhost:3000/api/comments/create", requestOptions);
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

    await fetch("http://localhost:3000/api/votes/create", requestOptions);
  }

  return (
    <div className={styles.wrapper}>
      <LeftSidebar />
      <div className={styles.question}>
        <div className={styles["question-top"]}>
          <h1>{question.title}</h1>
          <p>Asked {renderDates(question.createdAt)} ago</p>
        </div>
        <div className={styles["question-info"]}>
          <div className={styles["question-content"]}>
            <div className={styles.voting}>
              <Button onClick={() => postVote("up")}>
                <img alt="upvote" src="/triangle.svg"></img>
              </Button>
              <p>{voteCount}</p>
              <Button onClick={() => postVote("down")}>
                <img alt="downvote" src="/triangle.svg"></img>
              </Button>
            </div>
            <p>{question.content}</p>
          </div>
          <div className={styles["question-meta"]}>
            <span>
              <img src={`${question.userImg}`}></img>
              <p>{`${question.userName}`}</p>
            </span>
          </div>
        </div>

        <div className={styles.comments}>
          <h2>
            {comments.length} {comments.length === 1 && "Answer"}
            {comments.length != 1 && "Answers"}
          </h2>
          {comments.map((comment, i) => {
            return (
              <div key={i} className={styles.comment}>
                <p>{comment.content}</p>
                {question.userId === session?.user?._id && (
                  <button
                    onClick={() => {
                      postSolution(comment._id);
                    }}
                  >
                    Mark as answer
                  </button>
                )}
                <div className={styles["comment-meta"]}>
                  <p>answered {renderDates(comment.createdAt)} ago</p>
                  <div className={styles["comment-meta-user"]}>
                    <img alt="userpicture" src={`${comment.userImg}`} />
                    <p>{comment.userName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles["comment-post"]}>
          <h2>Your Answer</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <Button variant={"blue"} onClick={() => postComment()}>
            Post Your Answer
          </Button>
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
  const comments = await Comment.find({ qid: questionId });

  return {
    props: {
      question: JSON.parse(JSON.stringify(question)),
      comments: JSON.parse(JSON.stringify(comments)),
      votes: JSON.parse(JSON.stringify(votes)),
    },
  };
}

export async function getStaticPaths() {
  // await connectDB();

  // const questions = await Question.find({}).select("_id");

  // const paths = questions.map((questions) => {
  //   return { params: { id: questions._id.toString() } };
  // });
  return {
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}

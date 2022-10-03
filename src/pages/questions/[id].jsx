import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/LeftSidebar";
import styles from "@/styles/Question.module.scss";
import Question from "models/question";
import connectDB from "utils/connectDB";
import Button from "@/components/Button";
import renderDates from "utils/renderDates";
import { useSession, signIn } from "next-auth/react";
import useSWR from "swr";

const QuestionId = ({ question }) => {
  const [comment, setComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const { data: session } = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const router = useRouter();

  const newComment = {
    qid: router.query.id,
    content: comment,
  };

  let { data: comments, error } = useSWR(
    `/api/comments/get?qid=${router?.query?.id}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  let { data: votes, error: voteserr } = useSWR(
    `/api/votes/get?qid=${router?.query?.id}`,
    fetcher,
    { refreshInterval: 800 }
  );
  if (!comments) {
    comments = [];
  }
  if (!votes) {
    votes = [];
  }

  let voteCount = votes.reduce(
    (prev, current) => prev + (current.type === "up" ? 1 : -1),
    0
  );

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

    await fetch(
      "https://q-and-a-forum.vercel.app/api/questions/solution",
      requestOptions
    );
  }

  async function postComment() {
    setPostingComment(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newComment),
      redirect: "follow",
    };
    setComment("");
    const sendComment = await fetch(
      "https://q-and-a-forum.vercel.app/api/comments/create",
      requestOptions
    );
    console.log(await sendComment.status);
    if ((await sendComment.status) === 200) {
      setPostingComment(false);
    }
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

    await fetch(
      "https://q-and-a-forum.vercel.app/api/votes/create",
      requestOptions
    );
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
              <img alt="user" src={`${question.userImg}`}></img>
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
                {question.solution === comment._id && <img src="/check.svg" />}
                <p>{comment.content}</p>

                <div className={styles["comment-meta"]}>
                  {question.userId === session?.user?._id && (
                    <button
                      onClick={() => {
                        postSolution(comment._id);
                      }}
                    >
                      Mark as answer
                    </button>
                  )}
                  <p>answered {renderDates(comment.createdAt)} ago</p>
                  <div className={styles["comment-meta-user"]}>
                    <img alt="user" src={`${comment.userImg}`} />
                    <p>{comment.userName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {session && (
          <div className={styles["comment-post"]}>
            <h2>Your Answer</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <Button
              disabled={postingComment}
              variant={"blue"}
              onClick={() => postComment()}
            >
              Post Your Answer
            </Button>
          </div>
        )}
        {!session && (
          <div className={styles.notuser}>
            <h2>You need to be logged in in order to answer..</h2>
            <Button onClick={() => signIn()} variant={"blue"}>
              Log in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionId;

export async function getStaticProps(context) {
  const questionId = context.params.id;
  await connectDB();

  const question = await Question.findById(questionId);

  return {
    props: {
      question: JSON.parse(JSON.stringify(question)),
    },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  await connectDB();

  const questions = await Question.find({}).select("_id");

  const paths = questions.map((questions) => {
    return { params: { id: questions._id.toString() } };
  });
  return {
    paths: paths,
    fallback: "blocking", // false or 'blocking'
  };
}

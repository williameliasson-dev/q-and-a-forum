import React, { useEffect, useState } from "react";
import styles from "@/styles/Ask.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const ask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState();

  const router = useRouter();

  const newQuestion = {
    title,
    content,
    tags,
  };

  function validateQuestion() {
    if (title.length > 50 || title.length < 15) {
      setError({
        area: "title",
        message: "Title cannot be longer than 50 or shorter than 15 characters",
      });
    } else {
      setError(null);
      postQuestion();
    }
  }

  async function postQuestion(req, res) {
    if (error) return;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newQuestion),
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:3000/api/questions/create",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    router.push(`/questions/${data.savedDoc._id}`);
  }

  return (
    <div className={styles["ask-container"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Ask a public question</h1>
        <div className={styles.ask}>
          <div className={styles["ask-title"]}>
            <h2>Title</h2>
            <p>
              Be specific and imagine you’re asking a question to another person
            </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
          </div>
          <div className={styles["ask-body"]}>
            <h2>Body</h2>
            <p>
              Include all the information someone would need to answer your
              question
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={styles["ask-tags"]}>
            <h2>Tags</h2>
            <p>Add up to 5 tags to describe what your question is about</p>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. (angularjs javascript string)"
            />
          </div>
        </div>
        <Button onClick={() => validateQuestion()} variant={"blue"}>
          Post your question
        </Button>
      </form>
    </div>
  );
};

export default ask;

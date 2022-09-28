import React, { useEffect, useState } from "react";
import styles from "@/styles/Ask.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const ask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addTag, setAddTag] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState({ title: null, body: null, tags: null });

  const router = useRouter();

  const newQuestion = {
    title,
    content,
    tags,
  };

  useEffect(() => {
    if (addTag.includes(" ") && tags.length < 5) {
      setTags([...tags, addTag.split(" ")[0]]);
      setAddTag("");
    }
  }, [addTag]);

  function validateQuestion() {
    let newError = { title: null, body: null, tags: null };
    if (title.length > 100 || title.length < 15) {
      newError.title =
        "Title cannot be longer than 100 or shorter than 15 characters";
      console.log(error.title);
    }
    if (content.length < 100 || content.length > 1000) {
      newError.body =
        "Body cannot be longer than 1000 or shorter than 100 characters";
    }

    if (!newError.body && !newError.tags && !newError.title) {
      postQuestion();
    }
    setError(newError);
  }

  async function postQuestion() {
    if (error.title || error.body) return;
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
              className={error.title ? styles.inputerror : ""}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
            {error.title && (
              <div className={styles.error}>
                <p>{error.title}</p>
              </div>
            )}
          </div>
          <div className={styles["ask-body"]}>
            <h2>Body</h2>
            <p>
              Include all the information someone would need to answer your
              question
            </p>
            <textarea
              className={error.title ? styles.inputerror : ""}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {error.body && (
              <div className={styles.error}>
                <p>{error.body}</p>
              </div>
            )}
          </div>
          <div className={styles["ask-tags"]}>
            <h2>Tags</h2>
            <p>Add up to 5 tags to describe what your question is about</p>
            <div>
              {tags?.map((tag, i) => {
                return <span key={i}>{tag}</span>;
              })}
              <input
                value={addTag}
                onChange={(e) => setAddTag(e.target.value)}
                placeholder="e.g. (angularjs javascript string)"
              />
            </div>
            <Button variant={"blue"}>Add tag</Button>
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

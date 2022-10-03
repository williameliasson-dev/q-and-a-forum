import React, { useEffect, useState } from "react";
import styles from "@/styles/Ask.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

const Ask = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [posting, setPosting] = useState(false);
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
    setAddTag(addTag.trim());
    if (addTag.includes(" ") && tags.length < 5 && addTag.trim() !== "") {
      setTags([...tags, addTag?.split(" ")[0]]);
      setAddTag("");
    }
  }, [addTag]);

  function renderReview() {
    if (!error.body && !error.tags && !error.title) {
      return "Post your question";
    }
    if (posting === true) {
      return "...";
    }
    return "Review your question";
  }

  function validateQuestion() {
    let newError = { title: null, body: null, tags: null };
    if (title.length > 100 || title.length < 3) {
      newError.title =
        "Title cannot be longer than 100 or shorter than 3 characters";
    }
    if (content.length < 10 || content.length > 1000) {
      newError.body =
        "Body cannot be longer than 1000 or shorter than 10 characters";
    }

    if (!newError.body && !newError.tags && !newError.title) {
      postQuestion();
    }
    setError(newError);
  }

  async function postQuestion() {
    if (error.title || error.body || error.tags) return;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newQuestion),
      redirect: "follow",
    };
    setPosting(true);

    const response = await fetch(
      "https://q-and-a-forum-2apmq5q56-apspelet33.vercel.app/api/questions/create",
      requestOptions
    );

    const data = await response.json();
    if (await !data.savedDoc._id) {
      setPosting(false);
    } else {
      router.push(`/questions/${data.savedDoc._id}`);
    }
  }

  if (!session) {
    return (
      <div className={styles.notuser}>
        <h1>You need to be signed in to post a question!</h1>
        <div>
          <Button variant={"blue"} onClick={() => signIn()}>
            Log in
          </Button>
          <Button variant={"btn"} onClick={() => router.push("/questions")}>
            Return
          </Button>
        </div>
      </div>
    );
  } else
    return (
      <div className={styles["ask-container"]}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Ask a public question</h1>
          <div className={styles.ask}>
            <div className={styles["ask-title"]}>
              <h2>Title</h2>
              <p>
                Be specific and imagine you’re asking a question to another
                person
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
              {error.tags && (
                <div className={styles.error}>
                  <p>{error.tags}</p>
                </div>
              )}
              <div className={error.tags ? styles.inputerror : ""}>
                {tags?.map((tag, i) => {
                  return (
                    <span key={i}>
                      {tag}
                      <button
                        onClick={() => {
                          tags.splice(i, 1);
                          setTags([...tags]);
                        }}
                      >
                        <img alt="close" src="/x.svg" />
                      </button>
                    </span>
                  );
                })}
                <input
                  value={addTag}
                  onChange={(e) => setAddTag(e.target.value)}
                  placeholder="e.g. (angularjs javascript string)"
                />
              </div>
            </div>
          </div>
          <Button
            disabled={posting}
            onClick={() => validateQuestion()}
            variant={"blue"}
          >
            {renderReview()}
          </Button>
        </form>
      </div>
    );
};

export default Ask;

import React from "react";
import Question from "models/question";
import connectDB from "utils/connectDB";
import LeftSidebar from "@/components/LeftSidebar";
import styles from "@/styles/Tags.module.scss";
import Link from "next/link";

const tags = ({ tags, amountQuestions, answeredQuestions }) => {
  return (
    <div className={styles.wrapper}>
      <LeftSidebar />
      <div className={styles.tags}>
        {tags?.map((tag, i) => (
          <div className={styles.tag} key={i}>
            <div>
              <Link href={`/questions?tag=${tag}`}>
                <h3>{tag}</h3>
              </Link>

              <p>{amountQuestions[i]} questions</p>
              <p>{answeredQuestions[i]} questions answered</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default tags;

export async function getStaticProps(context) {
  await connectDB();

  const tags = await Question.distinct("tags");

  const amountQuestions = Promise.all(
    tags?.map(async (tag) => await Question.countDocuments({ tags: tag }))
  );
  const answeredQuestions = Promise.all(
    tags?.map(
      async (tag) =>
        await Question.countDocuments({
          tags: tag,
          solution: { $exists: true },
        })
    )
  );

  return {
    props: {
      tags,
      amountQuestions: JSON.parse(JSON.stringify(await amountQuestions)),
      answeredQuestions: JSON.parse(JSON.stringify(await answeredQuestions)),
    },
  };
}

import React from "react";
import Question from "models/question";
import connectDB from "utils/connectDB";
import styles from "@/styles/Tags.module.scss";

const tags = ({ tags, amountQuestions }) => {
  return (
    <div className="">
      {tags?.map((tag, i) => (
        <div key={i}>
          <h2>
            {tag}
            {amountQuestions[i]}
          </h2>
        </div>
      ))}
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

  return {
    props: {
      tags,
      amountQuestions: JSON.parse(JSON.stringify(await amountQuestions)),
    },
  };
}

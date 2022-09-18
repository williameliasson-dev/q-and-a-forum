import React from "react";
import Question from "models/question";
import connectDB from "utils/connectDB";

const QuestionId = ({ question }) => {
  console.log(question);
  return <div>[id]</div>;
};

export default QuestionId;

export async function getStaticProps(context) {
  const questionId = context.params.id;
  await connectDB();

  const question = await Question.find({ _id: questionId });
  return {
    props: {
      question: JSON.parse(JSON.stringify(question)),
    },
  };
}

export async function getStaticPaths() {
  await connectDB();

  const questions = await Question.find({}).select("_id");
  console.log(questions);

  const paths = questions.map((questions) => {
    return { params: { id: questions._id.toString() } };
  });
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

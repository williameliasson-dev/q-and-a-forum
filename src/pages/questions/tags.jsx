import React from "react";
import Question from "models/question";
import connectDB from "utils/connectDB";
import LeftSidebar from "@/components/LeftSidebar";
import Pagination from "@/components/Pagination/Pagination";
import styles from "@/styles/Tags.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const Tags = ({ tags, amountQuestions, answeredQuestions }) => {
  const router = useRouter();
  let page = parseInt(router.query.page) || 1;

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>q&a Tags</title>
        <meta name="description" content="q&a forum project!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LeftSidebar />
      <div className={styles.tags}>
        {tags?.map((tag, i) => {
          const qSuffix = () => (amountQuestions[i] > 1 ? "s" : "");
          const qaSuffix = () => (answeredQuestions[i] > 1 ? "s" : "");

          return (
            <div className={styles.tag} key={i}>
              <div>
                <Link href={`/questions?tag=${tag}`}>
                  <h3>{tag}</h3>
                </Link>
                <p>
                  {amountQuestions[i]} question{qSuffix()}
                </p>
                <p>
                  {answeredQuestions[i]} question{qaSuffix()} answered
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default Tags;

export async function getStaticProps(context) {
  await connectDB();

  let questionsAmount = await Question.count();

  const docsPerPage = 20;
  let maxPage = Math.ceil(questionsAmount / docsPerPage);
  const page = Math.min(
    maxPage,
    context.query?.page > 0 ? context.query.page : 1
  );

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
    revalidate: 60,
  };
}

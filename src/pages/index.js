import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="google-site-verification"
          content="lmfVMb8DKJGR7uIQ9ZmLMmZSsf6OI4s5gmqtjC9Dylg"
        />
        <title>q&a Home</title>
        <meta name="description" content="q&a forum project!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.welcome}>
        <img alt="dev" src="/dev.png" />
        <div>
          <h1>Welcome to q&a forum!</h1>
          <p>Got a question?</p>
          <p>Hopefully here someone will give you the answer.</p>
          <div>
            <Link href="/questions/ask">
              <Button variant={"blue"}>Post question</Button>
            </Link>
            <Link href="/questions?page=1&filter=newest&tag=undefined">
              <Button variant={"btn"}>See questions</Button>
            </Link>
          </div>
          <div>
            <p>
              This project is a q&a forum with a design inspired by
              stackoverflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

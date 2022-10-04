import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Button from "@/components/Button";
import Link from "next/link";

export default function Page404() {
  return (
    <div className={styles.container}>
      <Head>
        <title>q&a 404</title>
        <meta name="description" content="q&a forum project!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.welcome}>
        <div>
          <h1>404 Page not found</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/">
              <Button variant={"blue"}>Home</Button>
            </Link>
            <Link href="/questions">
              <Button variant={"btn"}>See questions</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from "@/styles/Home.module.css";
import Head from "next/head";
import useLoginUser from "store/store";

export default function DeshboardPage(props) {
  const userName = useLoginUser((state) => state.userName);

  return (
    <>
      <Head>
        <title>Felicity Daashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <div>
          <h1>hello, {userName}</h1>
          <p>dashboard</p>
        </div>
      </section>
    </>
  );
}

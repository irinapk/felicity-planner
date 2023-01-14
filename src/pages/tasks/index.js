import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function TaskPage() {
  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <div className={styles.title}>
          <h1>Task management</h1>
          <p>Here you can create and assign new tasks.</p>
          <p>Organize your team work better and make cooperation easier.s</p>
        </div>
      </section>
    </>
  );
}

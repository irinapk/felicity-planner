import Head from "next/head";
import React from "react";
import styles from "@/styles/Home.module.css";

export default function MyUserPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Felicity - My Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <div className={styles.title}>
          <h1>My Page</h1>
          <p>You can check your user information on this page.</p>
          <p>Edit incorrect information if required.</p>
        </div>
      </section>
    </React.Fragment>
  );
}

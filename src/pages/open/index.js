import Head from "next/head";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

export default function OpenSpacePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Felicity - OpenSpace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <div className={styles.title}>
          <h1>Open Space</h1>
          <p>Here is an open space for your team&#39;s casual communication.</p>
          <p>Watch, learn, share and comment.</p>
        </div>
      </section>
    </React.Fragment>
  );
}

import styles from "@/styles/Home.module.css";
import dashboardStyles from "@/styles/Dashboard.module.css";
import Head from "next/head";
import useLoginUser from "store/store";
import React, { useEffect, useState } from "react";

export default function DeshboardPage(props) {
  const userName = useLoginUser((state) => state.userName);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(userName);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Felicity - Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <div className={styles.title}>
          <h1>Dashboard</h1>
          <p>Hi, {name}! This is your team’s main dashboard.</p>
          <p>Your current work progress state at one glance.</p>
        </div>
        <div className={dashboardStyles.gridBox}>
          <div className={dashboardStyles.col}></div>
          <div className={dashboardStyles.col}></div>
        </div>
      </section>
    </React.Fragment>
  );
}

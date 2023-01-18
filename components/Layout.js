import styles from "@/styles/Layout.module.css";
import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";

export default function Layout(props) {
  return (
    <main className={styles.layout}>
      <SideMenu />
      <div className={styles.mainArea}>
        <Header />
        {props.children}
      </div>
    </main>
  );
}

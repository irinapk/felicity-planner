import styles from "@/styles/Layout.module.css";
import { useLoginCtx } from "context/LoginContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useLoginUser from "store/store";
import Header from "./Header";
import SideMenu from "./SideMenu";

export default function Layout(props) {
  const [isLogin, username, userLogin] = useLoginCtx();

  const router = useRouter();

  const userName = useLoginUser((state) => state.userName);
  const logged = useLoginUser((state) => state.isLogin);

  const signOutUser = useLoginUser((state) => state.signOutUser);

  const [curUser, setCurUser] = useState(userName);

  const handleLogOut = () => {
    router.push("/");
    userLogin("", false);
    signOutUser();
  };

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

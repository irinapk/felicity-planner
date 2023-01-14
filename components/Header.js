import styles from "@/styles/Layout.module.css";
import { IconButton } from "@mui/material";
import { useLoginCtx } from "context/LoginContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useLoginUser from "store/store";
import LogoutIcon from "@mui/icons-material/Logout";
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex";

export default function Header(props) {
  const router = useRouter();

  const userName = useLoginUser((state) => state.userName);
  const logged = useLoginUser((state) => state.isLogin);

  const signOutUser = useLoginUser((state) => state.signOutUser);

  const [curUser, setCurUser] = useState(userName);

  const handleLogOut = () => {
    router.push("/");
    signOutUser();
  };

  const getName = () => {
    if (curUser === userName) {
      return <p className={styles.username}>{curUser}</p>;
    } else {
      setCurUser(userName);
      return <p className={styles.username}>{userName}</p>;
    }
  };

  return (
    <nav className={styles.header}>
      <div>search</div>
      <div>{getName()}</div>
      <IconButton onClick={handleLogOut}>
        <LogoutIcon />
      </IconButton>
    </nav>
  );
}

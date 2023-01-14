import styles from "@/styles/Layout.module.css";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useLoginUser from "store/store";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";

const useStyles = {
  logoutIcon: {
    "& .MuiSvgIcon-root > path": {
      fill: "#909DA4",
    },
    "&:hover": {
      "& .MuiSvgIcon-root > path": {
        fill: "#58737D",
      },
    },
  },
};

export default function Header(props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const userName = useLoginUser((state) => state.userName);
  const logged = useLoginUser((state) => state.isLogin);

  const signOutUser = useLoginUser((state) => state.signOutUser);
  const [curUser, setCurUser] = useState(userName);

  const handleLogOut = () => {
    document.getElementById("logout-sound").play();
    setTimeout(() => {
      router.push("/");
    }, 700);
    setTimeout(() => {
      signOutUser();
    }, 800);
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const getName = () => {
    if (curUser === userName) {
      return (
        <div className={styles.username}>
          <PersonIcon />
          <p>{curUser}</p>
        </div>
      );
    } else {
      setCurUser(userName);
      return (
        <div className={styles.username}>
          <PersonIcon />
          <p>{userName}</p>
        </div>
      );
    }
  };

  return (
    <nav className={styles.header}>
      <div className={styles.search}>search</div>
      <div>{getName()}</div>
      <IconButton disableRipple sx={useStyles.logoutIcon}>
        <NotificationsNoneIcon />
      </IconButton>
      <IconButton
        disableRipple
        onClick={handleLogOut}
        sx={useStyles.logoutIcon}
      >
        <LogoutIcon />
      </IconButton>
      <audio id="logout-sound" controls style={{ display: "none" }}>
        <source src="/audio/finish_tone.mp3" type="audio/mpeg" />
      </audio>
    </nav>
  );
}

import Head from "next/head";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import useLoginUser from "store/store";
import { Button, TextField } from "@mui/material";

const useStyles = {
  userInput: {
    width: "100%",
    "& input": {
      fontFamily: "MontserratAlt",
      width: "100%",
      height: 53,
      textAlign: "center",
      padding: "10px 25px",
      background: "#FFFFFF",
      borderRadius: "20px",
      background: "white",
      color: "#222",
    },
    "& fieldset": {
      color: "#222",
      borderRadius: "20px",
      border: "none !important",
    },
  },
};

export default function Login(props) {
  const router = useRouter();
  const signInUser = useLoginUser((state) => state.signInUser);

  const [regUser, setRegUser] = useState("");

  const handleLogin = () => {
    document.getElementById("login-sound").play();
    if (regUser.trim() !== "") {
      setTimeout(() => {
        signInUser({
          name: regUser,
          isLogin: true,
        });
        router.push("/dashboard");
      }, 300);
    }
  };

  const onChangeName = (value) => {
    setRegUser(value);
  };

  return (
    <>
      <Head>
        <title>Felicity Planner App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <div className={styles.login}>
        <div className={styles.loginBox}>
          <img
            src="/feli_icon.png"
            style={{ width: "80px", marginBottom: "15px" }}
          />
          <TextField
            // inputProps={{
            //   autoComplete: "off",
            // }}
            autoComplete="off"
            sx={useStyles.userInput}
            placeholder="please enter your name"
            value={regUser}
            onChange={(e) => onChangeName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <p>username</p>
          <Button onClick={handleLogin}>sign in</Button>
        </div>
      </div>
      <audio id="login-sound" controls style={{ display: "none" }}>
        <source src="/audio/mouse_single_click.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}

import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Box, Divider } from "@mui/material";
import useLoginUser from "store/store";
import { ColorButton, LightButton } from "components/CustomButtons";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = {
  myInfoBox: {
    maxWidth: "100%",
    minWidth: 730,
    minHeight: 500,
    height: "100%",
    maxHeight: 700,
    marginRight: "180px",
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "10px",
    position: "relative",
    padding: "100px 140px",
    display: "flex",
    flexDirection: "column",
    "& .label-text": {
      display: "flex",
      width: "100%",
      columnGap: "50px",
      "& > span": {
        flex: 1,
        fontSize: "20px",
        color: "#2F476A",
      },
      "& > span:first-of-type": {
        textAlign: "end",
      },
      "& > span:last-of-type": {
        fontWeight: 600,
        display: "flex",
        columnGap: "6px",
      },
    },
  },
  myAvatar: {
    width: 316,
    height: 316,
    boxShadow: "6px 6px 9px 1px rgba(47, 71, 106, 0.4)",
    borderRadius: "35px",
    backgroundImage: `url("/images/profiles/trooper.png")`,
    backgroundSize: "cover",
    position: "absolute",
    right: "-130px",
    top: "100px",
  },
  dividerLine: {
    width: "90%",
    margin: "50px 0",
    backgroundColor: "#778C94",
  },
  editBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "6px",
    width: "130px",
  },
  stats: {
    maxWidth: "100%",
    "& > div": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px 10px",
      "& > span": {
        fontSize: "20px",
        textAlign: "center",
        height: 60,
        maxWidth: 240,
        width: "100%",
        marginBottom: "20px",
      },
      "& .circle": {
        borderRadius: "50%",
        border: "1px solid #E6A7A7",
        height: 90,
        width: 90,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > span": {
          fontSize: "42px",
          fontWeight: 600,
        },
      },
    },
  },
};

export default function MyUserPage() {
  const userName = useLoginUser((state) => state.userName);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(userName);
  }, []);

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
        <Box
          sx={useStyles.myInfoBox}
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box sx={useStyles.myAvatar} />

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            rowGap="30px"
            width={600}
          >
            <div className="label-text">
              <span>name:</span>
              <span>{name}</span>
            </div>
            <div className="label-text">
              <span>email:</span>
              <span>example @ mail dot com</span>
            </div>
            <div className="label-text">
              <span>phone number:</span>
              <span>010 2345 6789</span>
            </div>
            <div className="label-text">
              <span></span>
              {!isEditing ? (
                <span>
                  <ColorButton
                    onClick={() => setIsEditing(true)}
                    style={useStyles.editBtn}
                  >
                    <span>edit</span>
                    <EditIcon fontSize="16px" htmlColor="#FFF" />
                  </ColorButton>
                </span>
              ) : (
                <span>
                  <ColorButton
                    onClick={() => setIsEditing(false)}
                    style={useStyles.editBtn}
                  >
                    <span>cancel</span>
                  </ColorButton>
                  <LightButton
                    onClick={() => setIsEditing(false)}
                    style={useStyles.editBtn}
                  >
                    <span>save</span>
                  </LightButton>
                </span>
              )}
            </div>
          </Box>

          <Divider variant="middle" sx={useStyles.dividerLine} />

          <Box sx={useStyles.stats} display="flex">
            <div>
              <span>number of completed tasks</span>
              <div className="circle">
                <span>10</span>
              </div>
            </div>
            <div>
              <span>number of assigned tasks</span>
              <div className="circle">
                <span>10</span>
              </div>
            </div>
            <div>
              <span>number of shared posts</span>
              <div className="circle">
                <span>3</span>
              </div>
            </div>
          </Box>
        </Box>
      </section>
    </React.Fragment>
  );
}

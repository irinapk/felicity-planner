import styles from "@/styles/Home.module.css";
import dashboardStyles from "@/styles/Dashboard.module.css";
import Head from "next/head";
import useLoginUser from "store/store";
import React, { useEffect, useState } from "react";
import { getRandomQuote, getUsers } from "common/api";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { LoadingBalls } from "components/Loading";
import { Box } from "@mui/material";
import Image from "next/image";

export default function DashboardPage(props) {
  const userName = useLoginUser((state) => state.userName);
  const [name, setName] = useState("");
  const [randomQuote, setRandomQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setName(userName);
    if (props?.users) {
      setUserList(props.users);
    }
    if (props?.quote) {
      setRandomQuote(props.quote);
      setLoading(false);
    }
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
          <p>
            Hi, <b>{name}</b>! This is your team&#39;s main dashboard.
          </p>
          <p>Your current work progress state at one glance.</p>
        </div>
        <div className={dashboardStyles.gridBox}>
          <div className={dashboardStyles.userListArea}>
            <h2>Your team members</h2>
            <div>
              {userList.length > 0 &&
                userList.map((user) => (
                  <div key={user.id}>
                    <Image
                      src={user.avatar}
                      width={60}
                      height={60}
                      alt={user.name + "_image"}
                      style={{ borderRadius: "50%" }}
                    />
                    <p>{user.name}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className={dashboardStyles.quote}>
            <FormatQuoteIcon
              sx={{ fontSize: "80px", mr: "20px" }}
              htmlColor="#2F476A"
            />
            {loading ? (
              <LoadingBalls />
            ) : (
              <p>
                <i>&quot;{randomQuote?.quote}&quot;</i>
                <br />
                <b>{randomQuote?.author}</b>
              </p>
            )}
          </div>
          <div>
            <Box sx={{ height: 340 }} />
          </div>
          <div></div>
          <div></div>
          <div>
            <Box sx={{ height: 140 }} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const { result } = await getRandomQuote();
  const res = await getUsers();

  return {
    props: {
      quote: result[0],
      users: res.result,
    },
  };
}

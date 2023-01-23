import Head from "next/head";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { Box } from "@mui/material";
import PostBox from "page-components/post/PostBox";
import { ColorButton } from "components/CustomButtons";
import { getPosts } from "common/api";

export default function OpenSpacePage(props) {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/post/getPosts", { method: "POST" });
    const { result } = await res.json();
    if (result !== props.posts) setPosts(result);
    setUpdate(false);
  };

  useEffect(() => {
    if (update) {
      fetchData();
    }
    if (posts.length === 0 && props.posts) {
      setPosts(props.posts);
    }
  }, [update]);

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
        <Box
          display="flex"
          flexDirection="column"
          gap={"15px"}
          sx={{
            maxHeight: "calc(100vh - 310px)",
            overflow: "overlay",
            pr: "5px",
          }}
        >
          {posts &&
            posts.map((post, idx) => (
              <PostBox
                key={"post" + idx}
                post={post}
                updateData={() => setUpdate(true)}
              />
            ))}
        </Box>
        <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
          <ColorButton style={{ minWidth: "180px", marginTop: "10px" }}>
            new post
          </ColorButton>
        </Box>
      </section>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const res = await getPosts();

  return {
    props: {
      posts: res.result,
    },
  };
}

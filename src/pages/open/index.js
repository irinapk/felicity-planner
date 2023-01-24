import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import { Box } from "@mui/material";
import PostBox from "page-components/post/PostBox";
import { ColorButton, LightButton } from "components/CustomButtons";
import { getComments, getPosts } from "common/api";
import { useRouter } from "next/router";
import CustomTextEditor from "components/TextEditor";
import useLoginUser from "store/store";
import CustomInput from "components/CustomInput";

export default function OpenSpacePage(props) {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [comments, setComments] = useState({});
  const regUser = useLoginUser((state) => state.userName);

  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const addPost = useRef();

  const router = useRouter();

  const [postAreaHeight, setPostAreaHeight] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/post/getPosts", { method: "POST" });
    const { result } = await res.json();
    if (result !== props.posts) setPosts(result);
    setUpdate(false);
  };

  const saveNewPost = async (post) => {
    const res = await fetch("/api/post/addPost", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(post),
    });
    const { result } = await res.json();
    return result;
  };

  const onSavePost = () => {
    if (newPost.trim() !== "" && newTitle.trim() !== "") {
      addPost.current = {
        author: regUser,
        content: newPost,
        title: newTitle,
      };
      saveNewPost({ post: addPost.current }).then((res) => {
        setNewPost("");
        setNewTitle("");
        setUpdate(true);
      });
      setIsCreating(false);
    } else {
      alert("Title and post content are required");
    }
  };

  useEffect(() => {
    if (update) {
      fetchData();
    }
    if (posts.length === 0) {
      setPosts(props.posts);
    }
    if (props.comments.length > 0) {
      let commentsMap = {};
      props.comments.map((comment) => {
        if (commentsMap[comment.postID] === undefined)
          commentsMap[comment.postID] = [];
        commentsMap[comment.postID].push(comment);
      });
      setComments(commentsMap);
    }
  }, [update]);

  useEffect(() => {
    let height = document.getElementById("add-new-area").offsetHeight + 290;
    setPostAreaHeight(height);
  }, [isCreating]);

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
          style={{
            padding: "5px 10px 5px 0",
            maxHeight: postAreaHeight
              ? `calc(100vh - ${postAreaHeight}px)`
              : `calc(100vh - 310px)`,
            overflow: "overlay",
            pr: "5px",
          }}
        >
          {posts &&
            posts.map((post, idx) => (
              <PostBox
                currentUser={regUser}
                onClick={() => router.push(`/open/${post.id}`)}
                key={"post" + idx}
                post={post}
                comments={comments}
                updateData={() => setUpdate(true)}
              />
            ))}
          {posts && posts.length === 0 && (
            <p className={styles.emptyList}>Oops, no posts found</p>
          )}
        </Box>

        <Box
          id="add-new-area"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {isCreating && (
            <Box
              sx={{
                mt: "20px",
                width: "100%",
                borderRadius: "10px",
                fontSize: "20px",
              }}
            >
              <CustomInput
                required
                value={newTitle}
                onChangeValue={setNewTitle}
                placeholder="Title"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <CustomTextEditor value={newPost} onChangeValue={setNewPost} />
            </Box>
          )}
          <div>
            {!isCreating ? (
              <ColorButton
                style={{ minWidth: "180px", marginTop: "10px" }}
                onClick={() => setIsCreating(true)}
              >
                new post
              </ColorButton>
            ) : (
              <>
                <ColorButton
                  style={{ marginTop: "10px", marginRight: "6px" }}
                  onClick={() => {
                    setNewPost("");
                    setIsCreating(false);
                  }}
                >
                  cancel
                </ColorButton>
                <LightButton style={{ marginTop: "10px" }} onClick={onSavePost}>
                  save
                </LightButton>
              </>
            )}
          </div>
        </Box>
      </section>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const postRes = await getPosts();
  const commentRes = await getComments();

  return {
    props: {
      posts: postRes.result,
      comments: commentRes.result,
    },
  };
}

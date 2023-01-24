import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import { Box } from "@mui/material";
import PostBox from "page-components/post/PostBox";
import { ColorButton } from "components/CustomButtons";
import { useRouter } from "next/router";
import { getCommentsForPost, getPostDetail } from "common/api";
import CommentBox from "page-components/post/CommentBox";
import CustomTextEditor from "components/TextEditor";
import useLoginUser from "store/store";

const postStyles = {
  commentArea: {
    overflow: "overlay",

    marginBottom: "20px",
    padding: "5px",
  },
};

export default function PostDetailPage(props) {
  const [post, setPost] = useState(null);
  const regUser = useLoginUser((state) => state.userName);
  const [update, setUpdate] = useState(false);
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const addComment = useRef();
  const [commentsArea, setCommentsArea] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/comment/getComments", { method: "POST" });
    const { result } = await res.json();
    if (result.length > 0) {
      let arr = [];
      result.map((elm) => {
        if (elm.postID === post.id) {
          arr.push(elm);
        }
      });
      setComments(arr);
    }
    console.log(result);

    setUpdate(false);
  };

  const saveNewComment = async (comment) => {
    const res = await fetch("/api/comment/addComment", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(comment),
    });
    const { result } = await res.json();
    return result;
  };

  const onSaveComment = () => {
    if (newComment.trim() !== "") {
      addComment.current = {
        author: regUser,
        content: newComment,
        postID: post.id,
      };
      saveNewComment({ comment: addComment.current }).then((res) => {
        setNewComment("");
        setUpdate(true);
      });
    } else {
      alert("The comment is empty");
    }
  };

  useEffect(() => {
    if (update) {
      fetchData();
    }
    if (post === null && props.post) {
      setPost(props.post);
    }
    if (comments.length === 0 && props.comments.length > 0) {
      setComments(props.comments);
    }
  }, [update]);

  useEffect(() => {
    let height = document.getElementById("add-comment-area").offsetHeight + 170;
    setCommentsArea(height);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Felicity - OpenSpace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <Box
          sx={postStyles.commentArea}
          style={{
            maxHeight: commentsArea
              ? `calc(100vh - ${commentsArea}px)`
              : `calc(100vh - 170px)`,
          }}
        >
          {post !== null && <PostBox post={post} />}

          {comments &&
            comments.length > 0 &&
            comments.map((comment) => (
              <CommentBox
                key={comment.id}
                comment={comment}
                currentUser={regUser}
                updateData={() => setUpdate(true)}
              />
            ))}
        </Box>
        <Box
          id="add-comment-area"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <CustomTextEditor value={newComment} onChangeValue={setNewComment} />

          <ColorButton
            style={{ width: "140px", marginTop: "10px" }}
            onClick={onSaveComment}
          >
            add comment
          </ColorButton>
        </Box>
      </section>
    </React.Fragment>
  );
}

export async function getServerSideProps({ params }) {
  const postRes = await getPostDetail(params.id);
  const commentRes = await getCommentsForPost(params.id);

  return {
    props: {
      post: postRes.result[0],
      comments: commentRes.result,
    },
  };
}

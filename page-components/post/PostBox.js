import { Box, Button } from "@mui/material";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

const useStyles = {
  post: {
    width: "100%",
    minHeight: 180,
    background: "#F6F6F6",
    borderRadius: "10px",
    padding: "30px 35px",

    "& > div:nth-of-type(2)": {
      width: "100%",
      display: "flex",
      color: "#2F476A",
      flexDirection: "column",
      "& .content": {
        flex: 1,
      },
    },
    "& .title": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "15px",
      "& p": {
        fontSize: "20px",
        fontWeight: 600,
      },
      "& span": {
        fontSize: "14px",
        fontWeight: 400,
        // color: "#2F476A",
      },
    },
    "& .post-footer": {
      width: "100%",
      marginTop: "15px",
      display: "flex",
      justifyContent: "flex-end",
      columnGap: "6px",
    },
    "&:hover": {
      background: "#fff",
    },
  },
  author: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    marginRight: "40px",
    fontWeight: "bold",
  },
  postBtn: {
    borderRadius: "20px",
    color: "#2F476A",
    border: "0.5px solid #97A3B4",
    height: 30,
    padding: "4px 15px",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "none",
    "& svg": {
      marginRight: "6px",
    },
    "&:hover": {
      background: "#97A3B4",
      color: "#FFF",
    },
  },
};

export default function PostBox(props) {
  const { post, updateData } = props;

  const onClickLike = () => {
    updatePost({ id: post.id, likes: post.likes + 1 }).then((res) => {
      updateData();
    });
  };

  const updatePost = async (id, likes) => {
    const res = await fetch("/api/post/addLike", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(id, likes),
    });
    const { result } = await res.json();
    return result;
  };

  return (
    <Box display="flex" sx={useStyles.post}>
      <Box sx={useStyles.author}>
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
        <span>{post.author.name}</span>
      </Box>

      <div>
        <div className="title">
          <p>{post.title}</p>
          <span>{post.createdDt}</span>
        </div>
        <p className="content">{post.content}</p>
        <div className="post-footer">
          <Button sx={useStyles.postBtn} onClick={onClickLike}>
            <FavoriteBorderIcon fontSize={"16px"} />
            {post.likes}
          </Button>
          <Button sx={useStyles.postBtn}>
            <InsertCommentOutlinedIcon fontSize="16px" />
            Comments &#40;10&#41;
          </Button>
        </div>
      </div>
    </Box>
  );
}

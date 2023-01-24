import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "components/ConfirmDialog";
import { useState } from "react";

const useStyles = {
  comment: {
    width: "100%",
    minHeight: 80,
    marginTop: "15px",
    "& .content": {
      flex: 1,
      display: "flex",
      position: "relative",
      flexDirection: "column",
      background: "rgba(246, 246, 246, 0.7)",
      borderRadius: "0px 10px 10px 10px",
      padding: "20px 35px 10px 35px",
      "&::before": {
        content: '""',
        width: 0,
        height: 0,
        position: "absolute",
        borderLeft: "10px solid transparent",
        borderRight: "15px solid rgba(246, 246, 246, 0.7)",
        borderTop: "10px solid transparent",
        borderBottom: "0px solid transparent",
        top: "0%",
        right: "100%",
      },
      "&:hover": {
        background: "#fff",
        "&::before": {
          borderRight: "15px solid #FFF",
        },
      },
      "& > div": {
        maxWidth: "70%",
        minWidth: 400,
        fontSize: "16px",
        color: "#2F476A",
      },
      "& span": {
        fontSize: "12px",
        alignSelf: "flex-end",
        color: "#7C8993",
      },
      "& > button": {
        alignSelf: "flex-end",
        color: "#7C8993",
        "&:hover": {
          color: "var(--primary-color-dark)",
          background: "transparent",
        },
      },
    },

    "& > div:nth-of-type(2)": {
      width: "100%",
      display: "flex",
      color: "#2F476A",
      flexDirection: "column",
    },
  },
  author: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "30px",
    fontWeight: "bold",
    "& > span": {
      marginTop: "4px",
      background: "#E0E7EB",
      borderRadius: "5px",
      padding: "3px 10px",
    },
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

export default function CommentBox(props) {
  const { id, author, content, createdDt } = props.comment;
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const updatePost = async (id, likes) => {
    const res = await fetch("/api/post/addLike", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(id, likes),
    });
    const { result } = await res.json();
    return result;
  };

  const onClickDelete = () => {
    deletePost({ id: id }).then((res) => {
      setOpenDeleteConfirm(false);
      props.updateData();
    });
  };

  const deletePost = async (id) => {
    const res = await fetch("/api/comment/deleteComment", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(id),
    });
    const { result } = await res.json();
    return result;
  };

  return (
    <Box display="flex" sx={useStyles.comment}>
      <Box sx={useStyles.author}>
        <Image
          src={author.avatar}
          alt={author.name}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
        <span>{author.name}</span>
      </Box>

      <div className="content">
        <span>{createdDt}</span>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {props.currentUser && props.currentUser === author.name && (
          <IconButton size="small" onClick={() => setOpenDeleteConfirm(true)}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <ConfirmDialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        content="Are you sure you want to delete this comment?"
        onOk={onClickDelete}
      />
    </Box>
  );
}

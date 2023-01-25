import { Box } from "@mui/material";
import { TagSvg } from "../../components/Icons";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "components/ConfirmDialog";
import { useState } from "react";

const useStyles = {
  cardBox: {
    width: 300,
    minHeight: 200,
    borderRadius: "10px",
    background: "#F6F6F6",
    boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.25)",
    position: "relative",
    paddingBottom: "20px",
    "& > svg": {
      position: "absolute",
      transform: "translate(250px, -1px)",
    },
    "& > .card-title": {
      color: "#2F476A",
      fontSize: "22px",
      fontWeight: 600,
      padding: "20px",
      minHeight: 70,
      maxWidth: "calc(100% - 30px)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    "& > .description": {
      color: "#222",
      fontSize: "16px",
      margin: "0px 20px 10px 20px",
      minHeight: 54,
    },
    "& > div:last-of-type": {
      display: "flex",
      flexDirection: "row",
      margin: "0 20px",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    "& .due-date": {
      display: "flex",
      gap: "15px",
      alignItems: "flex-end",
      "& p": {
        fontSize: "12px",
        color: "#2B2F2F",
      },
      "& svg:hover": {
        color: "var(--primary-color-dark)",
      },
    },
    "& .avatar": {
      width: 35,
      height: 35,
      borderRadius: "50%",
      border: "1px solid #7C8993",
      backgroundSize: "contain",
    },
    "& p": {
      marginBlockEnd: 0,
      marginBlockStart: 0,
    },
    "&:hover": {
      cursor: "pointer",
      background: "#fff",
    },
  },
};

export default function TaskCard({ data, onDeleteUpdate }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  let color = "#BCD1A2";
  if (data.priority === 1) {
    color = "#EC7C7C";
  } else if (data.priority === 2) {
    color = "#7E7E7E";
  }

  const deleteTask = async (id) => {
    const res = await fetch("/api/task/deleteTask", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(id),
    });
    const { result } = await res.json();
    return result;
  };

  const onDelete = async () => {
    deleteTask({ id: data.id }).then((res) => {
      if (res["deleted_hashes"] && res["deleted_hashes"] !== null) {
        onDeleteUpdate();
      }
    });
    setOpenConfirm(false);
  };

  return (
    <Box sx={useStyles.cardBox}>
      {data && (
        <>
          <TagSvg color={color} />
          <p className="card-title">{data.title}</p>
          <p className="description">{data.description}</p>
          <div>
            <div className="due-date">
              <p>Due date: {data.dueDt}</p>
              <DeleteIcon
                fontSize="small"
                htmlColor="#C6C5C8"
                onClick={() => setOpenConfirm(true)}
              />
            </div>
            <Box sx={{ position: "relative", height: 30 }}>
              {data.assignedTo.map((assignee, idx) => (
                <Box
                  key={assignee.name + idx}
                  className="avatar"
                  style={{ right: `${15 * idx}px` }}
                  sx={{
                    position: "absolute",
                    backgroundImage: `url("${assignee.avatar}")`,
                  }}
                />
              ))}
            </Box>
          </div>
        </>
      )}
      <ConfirmDialog
        open={openConfirm}
        content={"Are you sure you want to delete this task?"}
        onClose={() => setOpenConfirm(false)}
        onOk={onDelete}
      />
    </Box>
  );
}

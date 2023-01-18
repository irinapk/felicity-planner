import { Box } from "@mui/material";
import { TagSvg } from "../../components/Icons";

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
      fontSize: "20px",
      fontWeight: 600,
      padding: "20px",
      minHeight: 70,
    },
    "& > .description": {
      color: "#7C8993",
      fontSize: "14px",
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
      fontSize: "12px",
      color: "#2B2F2F",
      marginBlockEnd: 0,
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

export default function TaskCard({ data }) {
  let color = "#BCD1A2";
  if (data.priority === 1) {
    color = "#EC7C7C";
  } else if (data.priority === 2) {
    color = "#7E7E7E";
  }

  return (
    <Box sx={useStyles.cardBox}>
      {data && (
        <>
          <TagSvg color={color} />
          <p className="card-title">{data.title}</p>
          <p className="description">{data.description}</p>
          <div>
            <p className="due-date">Due date: {data.dueDt}</p>
            <Box
              className="avatar"
              sx={{ backgroundImage: `url("${data.assignedTo[0].avatar}")` }}
            />
          </div>
        </>
      )}
    </Box>
  );
}

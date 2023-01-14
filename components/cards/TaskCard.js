import { Box } from "@mui/material";
import { TagSvg } from "../Icons";

const useStyles = {
  cardBox: {
    width: 300,
    height: 220,
    borderRadius: "10px",
    background: "#F6F6F6",
    boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.25)",
    position: "relative",
    "& > svg": {
      position: "absolute",
      transform: "translate(250px, -1px)",
    },
    "& > .card-title": {
      color: "#2F476A",
      fontSize: "18px",
      fontWeight: 600,
      padding: "20px",
    },
    "& > .description": {
      color: "#7C8993",
      fontSize: "11px",
      margin: "30px 20px 20px 20px",
    },
    "& > div:last-of-type": {
      display: "flex",
      flexDirection: "row",
      margin: "0 20px",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    "& .due-date": {
      fontSize: "11px",
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
  },
};

export default function TaskCard() {
  return (
    <Box sx={useStyles.cardBox}>
      <TagSvg color="#EC7C7C" />
      <p className="card-title">Deploy the most recent version of the app</p>
      <p className="description">
        Description: We’ve just finished the new version and decided to update
        our app asap. Test before deploying.
      </p>
      <div>
        <p className="due-date">Due date: 2023/02/10</p>
        <Box
          className="avatar"
          sx={{ backgroundImage: `url(/images/profiles/trooper.png)` }}
        />
      </div>
    </Box>
  );
}

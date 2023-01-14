import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

export const dialogStyles = {
  dialog: {
    "& .MuiPaper-root": {
      width: 750,
      height: 560,
      background: "#FFFFFF",
      boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.25)",
      borderRadius: "10px",
    },
  },
  title: {
    height: 90,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #97A3B4",
    fontFamily: "MontserratAlt",
    fontWeight: "bold",
    color: "var(--primary-color-dark)",
  },
  content: {
    fontFamily: "MontserratAlt",
    display: "flex",
    flexDirection: "column",
    padding: "30px 100px",
    paddingTop: "30px !important",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    rowGap: "20px",
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
    "& span": {
      fontWeight: 400,
      fontSize: "21px",
      textAlign: "right",
      marginRight: "40px",
      color: "var(--primary-color-dark)",
    },
  },
  inputField: {
    height: 40,

    "& input": {
      height: 30,
      color: "#222",
      fontSize: "16px",
      fontWeight: 600,
      fontFamily: "MontserratAlt",
      background: "#F5F5F5",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
    },
    "& fieldset": {
      height: 40,
      border: "none",
    },
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    justifyContent: "center",
    padding: "25px",
    "& button": {
      color: "#FFF",
      fontFamily: "MontserratAlt",
      border: "none",
      width: 72,
      height: 72,
      borderRadius: "50%",
      textTransform: "none",
      "&:hover": {
        filter: "brightness(90%)",
      },
    },
    "& > button:first-of-type": {
      background: "#FFB7B7",
    },
    "& > button:last-of-type": {
      background: "#BDC8AF",
    },
  },
};

export default function TaskCreateDialog(props) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} sx={dialogStyles.dialog} onClose={onClose}>
      <DialogTitle sx={dialogStyles.title}>new task</DialogTitle>
      <DialogContent sx={dialogStyles.content}>
        <div>
          <span>title</span>
          <TextField sx={dialogStyles.inputField} />
        </div>
        <div>
          <span>description</span>
          <TextField sx={dialogStyles.inputField} />
        </div>
        <div>
          <span>assigned to</span>
          <TextField sx={dialogStyles.inputField} />
        </div>
        <div>
          <span>due date</span>
          <TextField sx={dialogStyles.inputField} />
        </div>
        <div>
          <span>importance</span>
          <TextField sx={dialogStyles.inputField} />
        </div>
      </DialogContent>
      <DialogActions sx={dialogStyles.actionBtn}>
        <Button onClick={onClose}>back</Button>
        <Button onClick={onClose}>ok</Button>
      </DialogActions>
    </Dialog>
  );
}

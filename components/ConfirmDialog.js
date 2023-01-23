import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CancelButton, OkButton } from "components/CustomButtons";
import { dialogStyles } from "page-components/task/TaskCreateDialog";

const style = {
  dialogBg: {
    "& .MuiDialog-paper": {
      backgroundImage: 'url("/images/confirm_bg.jpg")',
    },
  },
  content: {
    display: "flex",
    padding: "30px 100px 10px 100px",
    paddingTop: "30px !important",
    justifyContent: "center",
    "& > p": {
      fontFamily: "MontserratAlt",
      fontSize: "22px",

      textAlign: "center",
    },
  },
};

export default function ConfirmDialog(props) {
  const { open, onClose, onOk, content } = props;

  return (
    <Dialog
      open={open}
      sx={[dialogStyles.dialog, style.dialogBg]}
      onClose={onClose}
    >
      <DialogTitle sx={dialogStyles.title}>confirmation</DialogTitle>
      <DialogContent sx={style.content}>
        <p>{content}</p>
      </DialogContent>
      <DialogActions sx={dialogStyles.actionBtn}>
        <CancelButton onClick={onClose} />
        <OkButton onClick={onOk} />
      </DialogActions>
    </Dialog>
  );
}

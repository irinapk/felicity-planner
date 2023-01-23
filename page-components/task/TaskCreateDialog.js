import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getUsers } from "common/api";
import { CancelButton, OkButton } from "components/CustomButtons";
import CustomInput from "components/CustomInput";
import CustomSelect from "components/CustomSelect";
import { useEffect, useRef, useState } from "react";
import useLoginUser from "store/store";

export const dialogStyles = {
  dialog: {
    "& .MuiDialog-paper": {
      width: 750,
      height: "max-content",
      backgroundImage: 'url("/images/dialog_bg.jpg")',
      backgroundSize: "cover",
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
      "& > div": {
        width: 220,
      },
    },
    "& span": {
      fontWeight: 400,
      fontSize: "21px",
      textAlign: "right",
      marginRight: "40px",
      color: "var(--primary-color-dark)",
    },
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    justifyContent: "center",
    padding: "25px",
  },
};

function isEmpty(field) {
  if (typeof field === "string") {
    return field.trim() === "";
  } else if (typeof field === "object") {
    return field === null || field === undefined || field === [];
  }
}

export default function TaskCreateDialog(props) {
  const { open, onClose, updateData } = props;
  const regUser = useLoginUser((state) => state.userName);

  const [users, setUsers] = useState([]);
  const priorityLevels = [
    { name: "high", value: 1 },
    { name: "medium", value: 2 },
    { name: "low", value: 3 },
  ];

  const newTask = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [dueDt, setDueDt] = useState("");
  const [priority, setPriority] = useState(3);

  const saveNewTask = async (task) => {
    const res = await fetch("/api/task/addTask", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(task),
    });
    const { result } = await res.json();
    return result;
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/user/getUsers", { method: "POST" });
    const { result } = await res.json();

    let userArr = [];
    result.map((user) => {
      userArr.push({ name: user.name, value: user });
    });
    return userArr;
  };

  useEffect(() => {
    if (open && users.length === 0) {
      fetchUsers().then((arr) => setUsers(arr));
    }
  }, [open]);

  const onSaveTask = () => {
    newTask.current = {
      assignedTo: assignedUsers,
      completeDt: null,
      description: description,
      dueDt: dueDt,
      priority: priority,
      regUser: regUser,
      status: "todo",
      title: title,
    };

    saveNewTask({ task: newTask.current }).then((res) => {
      onCloseDialog();
      if (res.inserted_hashes && res.inserted_hashes !== null) {
        updateData();
      }
    });
  };

  let saveBlock =
    isEmpty(title) ||
    isEmpty(description) ||
    isEmpty(assignedUsers) ||
    isEmpty(dueDt);

  const onCloseDialog = () => {
    setTitle("");
    setDescription("");
    setAssignedUsers([]);
    setDueDt("");
    setPriority(3);
    onClose();
  };

  return (
    <Dialog open={open} sx={dialogStyles.dialog} onClose={onCloseDialog}>
      <DialogTitle sx={dialogStyles.title}>new task</DialogTitle>
      <DialogContent sx={dialogStyles.content}>
        <div>
          <span>title</span>
          <CustomInput value={title} onChangeValue={setTitle} required />
        </div>
        <div>
          <span>description</span>
          <CustomInput
            value={description}
            onChangeValue={setDescription}
            required
            multiline
            minRows={3}
            maxRows={5}
          />
        </div>
        <div>
          <span>assigned to</span>
          <CustomSelect
            multiple={true}
            value={assignedUsers}
            onSelectValue={setAssignedUsers}
            required={true}
            items={users}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <span>due date</span>
          <CustomInput onChangeValue={setDueDt} required />
        </div>
        <div>
          <span>priority</span>
          <CustomSelect
            value={priority}
            onSelectValue={setPriority}
            required={true}
            items={priorityLevels}
          />
        </div>
      </DialogContent>
      <DialogActions sx={dialogStyles.actionBtn}>
        <CancelButton onClick={onCloseDialog} />
        <OkButton disabled={saveBlock} onClick={onSaveTask} />
      </DialogActions>
    </Dialog>
  );
}

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import CustomInput from "components/CustomInput";
import CustomSelect from "components/CustomSelect";
import { useEffect, useRef, useState } from "react";
import useLoginUser from "store/store";
import { postData } from "utils/postData";

export const dialogStyles = {
  dialog: {
    "& .MuiDialog-paper": {
      width: 750,
      height: 560,
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
  inputField: {
    height: 40,
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

// {
//   id: task.id,
//   assignedTo: task.assignedUsers,
//   completeDt: null,
//   description: task.description,
//   dueDt: task.dueDt,
//   priority: task.priority,
//   regUser: task.regUser,
//   status: task.status,
//   title: task.title,
// },

function isEmpty(field) {
  if (typeof field === "string") {
    return field.trim() === "";
  } else if (typeof field === "object") {
    return field === null || field === undefined || field === [];
  }
}

export default function TaskCreateDialog(props) {
  const { open, onClose, totalTasks, updateData } = props;
  const regUser = useLoginUser((state) => state.userName);

  const [users, setUsers] = useState([]);
  const priorityLevels = [
    { name: "high", value: 1 },
    { name: "medium", value: 2 },
    { name: "low", value: 3 },
  ];

  const newTask = useRef();

  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [dueDt, setDueDt] = useState("");
  const [priority, setPriority] = useState(3);

  const saveNewTask = async (task) => {
    const { response } = await postData(task, "/api/task/addTask");
    console.log(response);
    return response;
  };

  const fetchUsers = async () => {
    const { result } = await postData(null, "/api/user/getUsers");
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
    if (totalTasks) setTaskId("task0" + (totalTasks + 1));
  }, [open]);

  const onSaveTask = () => {
    newTask.current = {
      id: taskId,
      assignedTo: assignedUsers,
      completeDt: null,
      description: description,
      dueDt: dueDt,
      priority: priority,
      regUser: regUser,
      status: "todo",
      title: title,
    };

    saveNewTask({ task: newTask.current }).then((response) => {
      console.log(response);

      onCloseDialog();
      if (response.status === 200) {
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
    console.log("on close");
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
        <Button onClick={onCloseDialog}>back</Button>
        <Button disabled={saveBlock} onClick={onSaveTask}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

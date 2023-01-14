import Head from "next/head";
import styles from "@/styles/Home.module.css";
import TaskCard from "components/cards/TaskCard";
import { Box, Button } from "@mui/material";
import { textAlign } from "@mui/system";
import { useState } from "react";
import TaskCreateDialog from "page-components/task/TaskCreateDialog";

const useStyles = {
  cardBoard: {
    columnGap: "50px",
    justifyContent: "center",
    "& h4": {
      fontSize: "20px",
      width: "100%",
      textAlign: "center",
      //   marginBottom: "10px",
      color: "var(--primary-color-dark)",
    },
    "& > div": {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
    },
  },
  addBtn: {
    background: "transparent",
    width: "100%",
    height: 60,
    borderRadius: "10px",
    color: "#fff",
    border: "2px dashed #ffffff",
  },
};

export default function TaskPage() {
  const [createToDo, setCreateToDo] = useState(false);
  const [createProg, setCreateProg] = useState(false);
  const [createDone, setCreateDone] = useState(false);

  return (
    <>
      <Head>
        <title>Felicity - Task Board</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <div className={styles.title}>
          <h1>Task management</h1>
          <p>Here you can create and assign new tasks.</p>
          <p>Organize your team work better and make cooperation easier.s</p>
        </div>
        <Box display="flex" sx={useStyles.cardBoard}>
          <div>
            <h4>To Do</h4>
            <Button sx={useStyles.addBtn} onClick={() => setCreateToDo(true)}>
              New card
            </Button>
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
          <div>
            <h4>In Progress</h4>
            {/* <Button sx={useStyles.addBtn}>New card</Button> */}
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
          <div>
            <h4>Done</h4>
            {/* <Button sx={useStyles.addBtn}>New card</Button> */}
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </Box>
        <TaskCreateDialog
          open={createToDo}
          onClose={() => setCreateToDo(false)}
        />
      </section>
    </>
  );
}

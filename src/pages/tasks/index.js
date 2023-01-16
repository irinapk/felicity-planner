import Head from "next/head";
import styles from "@/styles/Home.module.css";
import TaskCard from "page-components/task/TaskCard";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import TaskCreateDialog from "page-components/task/TaskCreateDialog";
import { postData } from "utils/postData";

const useStyles = {
  cardBoard: {
    columnGap: "50px",
    justifyContent: "center",
    "& h4": {
      fontSize: "20px",
      width: "100%",
      textAlign: "center",
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

export default function TaskPage(props) {
  const [createToDo, setCreateToDo] = useState(false);

  const [tasks, setTasks] = useState(props.taskData);

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
            {tasks.length > 0 &&
              tasks.map((task) => {
                if (task.status === "todo") {
                  return <TaskCard key={task.id} data={task} />;
                }
              })}
          </div>
          <div>
            <h4>In Progress</h4>
            {tasks.length > 0 &&
              tasks.map((task) => {
                if (task.status === "progress") {
                  return <TaskCard key={task.id} data={task} />;
                }
              })}
          </div>
          <div>
            <h4>Done</h4>
            {tasks.length > 0 &&
              tasks.map((task) => {
                if (task.status === "done") {
                  return <TaskCard key={task.id} data={task} />;
                }
              })}
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

export async function getStaticProps() {
  const { response, result } = await postData(
    null,
    "http://localhost:3000/api/task/getTasks"
  );

  return {
    props: {
      taskData: result,
    },
  };
}

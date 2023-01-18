import Head from "next/head";
import styles from "@/styles/Home.module.css";
import TaskCard from "page-components/task/TaskCard";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskCreateDialog from "page-components/task/TaskCreateDialog";
import { postData } from "utils/postData";
import { LoadingBalls } from "components/Loading";
import { resolve } from "styled-jsx/css";

const useStyles = {
  cardBoard: {
    columnGap: "50px",
    justifyContent: "center",
    "& > div > div:first-of-type": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
    },
    "& h4": {
      fontSize: "20px",
      height: 20,
      textAlign: "center",
      color: "var(--primary-color-dark)",
    },
    "& > div": {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
      minWidth: 300,
    },
  },
  addBtn: {
    background: "transparent",
    marginLeft: "8px",
    width: 100,
    height: 40,
    borderRadius: "10px",
    color: "#fff",
    border: "1px dashed #ffffff",
  },
  loadingArea: {
    height: 50,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardsArea: {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    padding: "0 15px 20px 15px",
    maxHeight: "calc(100vh - 315px)",
    overflowY: "overlay",
  },
};

export default function TaskPage(props) {
  const [createToDo, setCreateToDo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);

  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    console.log("fetching tasks");
    const { response, result } = await postData(null, "/api/task/getTasks");
    setLoading(false);
    setTasks(result);
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <React.Fragment>
      <Head>
        <title>Felicity - Task Board</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/feli_icon.png" />
      </Head>
      <section className={styles.main}>
        <div className={styles.title}>
          <h1>Task Management</h1>
          <p>Here you can create and assign new tasks.</p>
          <p>Organize your team work and make cooperation easier.</p>
        </div>
        <Box display="flex" sx={useStyles.cardBoard}>
          <div>
            <div>
              <h4>To Do</h4>
              <Button sx={useStyles.addBtn} onClick={() => setCreateToDo(true)}>
                New card
              </Button>
            </div>

            {loading && (
              <Box sx={useStyles.loadingArea}>
                <LoadingBalls />
              </Box>
            )}
            <Box sx={useStyles.cardsArea}>
              {tasks.length > 0 &&
                tasks.map((task) => {
                  if (task.status === "todo") {
                    return <TaskCard key={task.id} data={task} />;
                  }
                })}
            </Box>
          </div>
          <div>
            <div>
              <h4>In Progress</h4>
            </div>
            {loading && (
              <Box sx={useStyles.loadingArea}>
                <LoadingBalls />
              </Box>
            )}
            {tasks.length > 0 &&
              tasks.map((task) => {
                if (task.status === "progress") {
                  return <TaskCard key={task.id} data={task} />;
                }
              })}
          </div>
          <div>
            <div>
              <h4>Done</h4>
            </div>
            {loading && (
              <Box sx={useStyles.loadingArea}>
                <LoadingBalls />
              </Box>
            )}
            {tasks.length > 0 &&
              tasks.map((task) => {
                if (task.status === "done") {
                  return <TaskCard key={task.id} data={task} />;
                }
              })}
          </div>
        </Box>
        <TaskCreateDialog
          totalTasks={tasks.length}
          open={createToDo}
          onClose={() => {
            setCreateToDo(false);
          }}
          updateData={() => setUpdate(!update)}
        />
      </section>
    </React.Fragment>
  );
}

// export async function getStaticProps() {
//   const { response, result } = await postData(
//     null,
//     "http://localhost:3000/api/task/getTasks"
//   );

//   return {
//     props: {
//       taskData: result,
//     },
//   };
// }

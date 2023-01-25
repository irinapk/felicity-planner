import Head from "next/head";
import styles from "@/styles/Home.module.css";
import TaskCard from "page-components/task/TaskCard";
import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TaskCreateDialog from "page-components/task/TaskCreateDialog";
import { LoadingBalls } from "components/Loading";
import { getTasks } from "common/api";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";

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
    minHeight: 540,
    overflowY: "overlay",
  },
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: "0px",
  margin: `0px`,
  //   background: isDragging ? "lightgreen" : "transparent",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#00000025" : "transparent",
  borderRadius: "10px",
  width: 330,
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function TaskTestPage(props) {
  const [createToDo, setCreateToDo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const [tasks, setTasks] = useState([]);

  const taskData = useRef({
    todo: [],
    progress: [],
    done: [],
  });

  const fetchData = async () => {
    const res = await fetch("/api/task/getTasks", { method: "POST" });
    const { result } = await res.json();
    if (result.length !== tasks.length) {
      refreshTaskData(result);
    }
    setTasks(result);
    setUpdate(false);
  };

  function refreshTaskData(data) {
    taskData.current["todo"] = data.filter((t) => t.status === "todo");
    taskData.current["progress"] = data.filter((t) => t.status === "progress");
    taskData.current["done"] = data.filter((t) => t.status === "done");
  }

  useEffect(() => {
    if (update) {
      fetchData();
    }
    if (tasks.length === 0 && props.tasks) {
      setLoading(false);
      setTasks(props.tasks);
      refreshTaskData(props.tasks);
    }
  }, [update]);

  const updateTask = async (data) => {
    const res = await fetch("/api/task/updateTask", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
    });
    const { result } = await res.json();
    return result;
  };

  function onTaskDelete(deleteID, status) {
    let updateArr = [];
    let deleteItem = tasks.filter((elm) => elm.id === deleteID)[0];

    tasks
      .filter((t) => t.status === status)
      .map((elm) => {
        if (elm.position > deleteItem.position) {
          updateArr.push({ id: elm.id, position: elm.position - 1 });
        }
      });

    updateTask({ data: [...updateArr] }).then((res) => {
      setUpdate(true);
    });
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    const sStatus = source.droppableId;
    const dStatus = destination.droppableId;

    const startIdx = source.index;
    const endIdx = destination.index;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (sStatus === dStatus) {
      if (startIdx === endIdx) {
        return;
      }

      taskData.current[sStatus] = reorder(
        taskData.current[sStatus],
        startIdx,
        endIdx
      );

      let newarr = [];
      tasks
        .filter((elm) => elm.status === sStatus)
        .map((item) => {
          if (item.position === startIdx) {
            newarr.push({ id: item.id, position: endIdx });
          }
          if (startIdx > endIdx && startIdx > item.position >= endIdx) {
            newarr.push({ id: item.id, position: item.position + 1 });
          }
          if (startIdx < endIdx && endIdx >= item.position > startIdx) {
            newarr.push({ id: item.id, position: item.position - 1 });
          }
        });

      updateTask({ data: [...newarr] }).then((res) => {
        console.log(res);
        setUpdate(true);
      });
    } else {
      const result = move(
        taskData.current[sStatus],
        taskData.current[dStatus],
        source,
        destination
      );

      taskData.current[sStatus] = result[sStatus];
      taskData.current[dStatus] = result[dStatus];

      let newarr = [];
      tasks
        .filter((elm) => elm.status === sStatus)
        .map((item) => {
          if (item.position > startIdx) {
            newarr.push({ id: item.id, position: item.position - 1 });
          }
          if (item.position === startIdx) {
            newarr.push({ id: item.id, position: endIdx, status: dStatus });
          }
        });
      tasks
        .filter((elm) => elm.status === dStatus)
        .map((item) => {
          if (item.position >= endIdx) {
            newarr.push({ id: item.id, position: item.position + 1 });
          }
        });

      updateTask({ data: [...newarr] }).then((res) => {
        setUpdate(true);
      });
    }
  }

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
        {tasks.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Box display="flex" sx={useStyles.cardBoard}>
              {Object.keys(taskData.current).map((board) => (
                <Droppable key={board + "-col"} droppableId={board}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      <div>
                        <h4>{board}</h4>
                        {board === "todo" && (
                          <Button
                            sx={useStyles.addBtn}
                            onClick={() => setCreateToDo(true)}
                          >
                            New card
                          </Button>
                        )}
                      </div>

                      {loading && (
                        <Box sx={useStyles.loadingArea}>
                          <LoadingBalls />
                        </Box>
                      )}
                      <Box sx={useStyles.cardsArea}>
                        {taskData.current[board].map((task, idx) => (
                          <Draggable
                            key={task.status + task.id}
                            draggableId={task.id}
                            index={idx}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <TaskCard
                                  onDeleteUpdate={() =>
                                    onTaskDelete(task.id, board)
                                  }
                                  key={task.id}
                                  data={task}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    </div>
                  )}
                </Droppable>
              ))}
            </Box>
          </DragDropContext>
        )}

        <TaskCreateDialog
          totalTodoTasks={taskData.current["todo"].length}
          open={createToDo}
          onClose={() => {
            setCreateToDo(false);
          }}
          updateData={() => setUpdate(true)}
        />
      </section>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  const res = await getTasks();

  return {
    props: {
      tasks: res.result,
    },
  };
}

import { DB_AUTH, DB_URL } from "constants/constants";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Basic ${DB_AUTH}`);

// ************** USER API  ************** //
export const createUser = async (id, name) => {
  const raw = JSON.stringify({
    operation: "insert",
    schema: "feli_dev",
    table: "users",
    records: [
      {
        id: id,
        name: name,
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const getUsers = async () => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: "select id, name, avatar, DATE_FORMAT(__createdtime__, 'YYYY-MM-DD HH:mm:ss') as createdDt, DATE_FORMAT(__updatedtime__, 'YYYY-MM-DD HH:mm:ss') as updatedDt from feli_dev.users",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const deleteUser = async (id) => {
  const raw = JSON.stringify({
    operation: "delete",
    table: "users",
    schema: "feli_dev",
    hash_values: [id],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

// ************** TASK API  ************** //

export const getTasks = async () => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: "SELECT *, DATE_FORMAT(__createdtime__, 'YYYY-MM-DD HH:mm:ss') as createdDt, DATE_FORMAT(__updatedtime__, 'YYYY-MM-DD HH:mm:ss') as updatedDt from feli_dev.tasks",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const createTask = async (task) => {
  const raw = JSON.stringify({
    operation: "insert",
    schema: "feli_dev",
    table: "tasks",
    records: [
      {
        id: task.id,
        assignedTo: task.assignedTo,
        completeDt: null,
        description: task.description,
        dueDt: task.dueDt,
        priority: task.priority,
        regUser: task.regUser,
        status: task.status,
        title: task.title,
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const deleteTask = async (id) => {
  const raw = JSON.stringify({
    operation: "delete",
    table: "tasks",
    schema: "feli_dev",
    hash_values: [id],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

// ************** POST API  ************** //

// ************** COMMENT API  ************** //

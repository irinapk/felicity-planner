import { DB_AUTH, DB_URL } from "constants/constants";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Basic ${DB_AUTH}`);

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
    sql: "SELECT * from feli_dev.users",
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

export const getTasks = async () => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: "SELECT * from feli_dev.tasks",
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

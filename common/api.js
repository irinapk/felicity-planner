const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Basic ${process.env.DB_AUTH}`);

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

  const response = await fetch(process.env.DB_URL, requestOptions);
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

  const response = await fetch(process.env.DB_URL, requestOptions);
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

  const response = await fetch(process.env.DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

// ************** TASK API  ************** //

export const getTasks = async () => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: "SELECT *, DATE_FORMAT(__createdtime__, 'YYYY-MM-DD HH:mm:ss') as createdDt, DATE_FORMAT(__updatedtime__, 'YYYY-MM-DD HH:mm:ss') as updatedDt from feli_dev.tasks order by position",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(process.env.DB_URL, requestOptions);
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
        assignedTo: task.assignedTo,
        completeDt: null,
        description: task.description,
        dueDt: task.dueDt,
        position: task.position,
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

  try {
    const response = await fetch(process.env.DB_URL, requestOptions);
    const result = await response.json();
    return { response, result };
  } catch (err) {
    return { error: err };
  }
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

  try {
    const response = await fetch(process.env.DB_URL, requestOptions);
    const result = await response.json();
    return { response, result };
  } catch (err) {
    return { error: err };
  }
};

export const updateTask = async (data) => {
  const raw = JSON.stringify({
    operation: "update",
    schema: "feli_dev",
    table: "tasks",
    records: data,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(process.env.DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

// ************** POST API  ************** //

export const getPosts = async () => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: "SELECT *, DATE_FORMAT(__createdtime__, 'YYYY-MM-DD HH:mm:ss') as createdDt, DATE_FORMAT(__updatedtime__, 'YYYY-MM-DD HH:mm:ss') as updatedDt from feli_dev.posts order by createdDt desc",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(process.env.DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const getPostDetail = async (id) => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: `SELECT *, DATE_FORMAT(__createdtime__, 'YYYY-MM-DD HH:mm:ss') as createdDt from feli_dev.posts where id="${id}"`,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(process.env.DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const addPostLike = async (id, likes) => {
  const raw = JSON.stringify({
    operation: "update",
    schema: "feli_dev",
    table: "posts",
    records: [
      {
        id: id,
        likes: likes,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(process.env.DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const createPost = async (post) => {
  const raw = JSON.stringify({
    operation: "insert",
    schema: "feli_dev",
    table: "posts",
    records: [
      {
        author: {
          name: post.author,
          avatar: "/images/profiles/trooper.png",
        },
        content: post.content,
        likes: 0,
        title: post.title,
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(process.env.DB_URL, requestOptions);
    const result = await response.json();
    return { response, result };
  } catch (err) {
    return { error: err };
  }
};

export const deletePost = async (id) => {
  const raw = JSON.stringify({
    operation: "delete",
    table: "posts",
    schema: "feli_dev",
    hash_values: [id],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(process.env.DB_URL, requestOptions);
    const result = await response.json();
    return { response, result };
  } catch (err) {
    return { error: err };
  }
};

// ************** COMMENT API  ************** //

export const getComments = async () => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: "SELECT *, DATE_FORMAT(__createdtime__, 'YYYY-MM-DD HH:mm') as createdDt from feli_dev.comments order by createdDt",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(process.env.DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const getCommentsForPost = async (id) => {
  const raw = JSON.stringify({
    operation: "sql",
    sql: `SELECT *, DATE_FORMAT(__createdtime__, 'YYYY-MM-DD HH:mm') as createdDt from feli_dev.comments where postID="${id}" order by createdDt`,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(process.env.DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};

export const createComment = async (comment) => {
  const raw = JSON.stringify({
    operation: "insert",
    schema: "feli_dev",
    table: "comments",
    records: [
      {
        author: {
          name: comment.author,
          avatar: "/images/profiles/trooper.png",
        },
        content: comment.content,
        postID: comment.postID,
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(process.env.DB_URL, requestOptions);
    const result = await response.json();
    return { response, result };
  } catch (err) {
    return { error: err };
  }
};

export const deleteComment = async (id) => {
  const raw = JSON.stringify({
    operation: "delete",
    table: "comments",
    schema: "feli_dev",
    hash_values: [id],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(process.env.DB_URL, requestOptions);
    const result = await response.json();
    return { response, result };
  } catch (err) {
    return { error: err };
  }
};

// ************** OPEN SOURCE DATA API  ************** //
export const getRandomQuote = async () => {
  const ninjasHeaders = new Headers();
  ninjasHeaders.append("Content-Type", "application/json");
  ninjasHeaders.append("X-Api-Key", `${process.env.NINJA_API_KEY}`);

  const requestOptions = {
    method: "GET",
    headers: ninjasHeaders,
  };

  const response = await fetch(
    process.env.NINJA_API_URL + "/quotes?category=computers",
    requestOptions
  );
  const result = await response.json();
  return { response, result };
};
